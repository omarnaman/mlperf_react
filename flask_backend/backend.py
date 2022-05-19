#!/usr/bin/env python3

import flask
from flask_cors import CORS, cross_origin
from flask import request, abort
import requests
import io
import time
import kubernetes_manager
from threading import Lock
from config import Config as BackendConfig

app = flask.Flask(__name__)
CORS(app)
PORT = 8083;


JOB_LOCK = Lock()
RUNNING_SELECTOR = -1
CONFIG = None
K8S_Manager = None

class NetEmConfig():
    def __init__(self) -> None:
        self.data = None
        self.bandwidth = None
        self.delay = None
        self.jitter = None
        self.loss_rate = None
        self.reorder = None

    @classmethod
    def from_dict(cls, data: dict):
        config = cls()
        config.data = data.copy()
        config.bandwidth = data.get("bandwidth")
        config.daley = data.get("daley")
        config.jitter = data.get("jitter")
        config.loss_rate = data.get("loss_rate")
        config.reorder = data.get("reorder")
        return config

    def to_args(self):
        args = ["--tc"]
        if self.bandwidth is not None:
            args.extend(["--tc_bandwidth", str(self.bandwidth)])
        if self.delay is not None:
            args.extend(["--tc_delay", str(self.delay)])
        if self.loss_rate is not None:
            args.extend(["--tc_random_loss", str(self.loss_rate)])
        if self.reorder is not None:
            args.extend(["--tc_reorder", str(self.reorder)])
        if len(args) == 1:
            return []
        return args

class Config():
    def __init__(self) -> None:
        self.lines = []
        self.server_netem: NetEmConfig = NetEmConfig()
        self.client_netem: NetEmConfig = NetEmConfig()
        self.data = None
        self.selector = None
        self.dataset_id = 0
        self.scenario = "SingleStream"

    @classmethod
    def from_dict(cls, data: dict, selector):
        config = cls()
        config.data = data.copy()
        config.selector = str(selector)
        configs = []
        ranges = {}
        for model in data["models"]:
            for scenario in model["scenarios"]:
                scenario_config = scenario["config"]
                for key in scenario_config.keys():
                    config_param = scenario_config[key]
                    if key == "num_threads" and isinstance(config_param, str):
                        if config_param.find("-") != -1: # Range
                            s, e = config_param.split("-")
                            ranges.update({f"{model['model_name']}.{scenario['scenario_name']}.{key}": {"start": int(s), "end": int(e)}})
                            continue
                    else:
                        config.add_line(model["model_name"], scenario["scenario_name"], key, scenario_config[key])
        if "netem" in data:
            netem = config["netem"]
            if "client" in netem.keys():
                config.client_netem = NetEmConfig.from_dict(netem["client"])
            if "server" in netem.keys():
                config.server_netem = NetEmConfig.from_dict(netem["server"])
        if "dataset_id" in data:
            config.dataset_id = data["dataset_id"]
        if "scenario" in data:
            config.scenario = data["scenario"]
        else:
            config.scenario = "SingleStream"

        #TODO make the range generation multi-dimentional 
        if len(ranges) == 1:
            key = list(ranges.keys())[0]
            for i in range(ranges[key]["start"], ranges[key]["end"] + 1):
                i_config = config.copy()
                i_config.lines.append(f"{key} = {i}")
                i_config.selector = str(i)
                configs.append(i_config)
            return configs
        return [config]

    def copy(self):
        config = Config()
        config.lines = self.lines.copy()
        config.selector = self.selector
        config.client_netem = self.client_netem
        config.server_netem = self.server_netem
        config.data = self.data
        config.dataset_id = self.dataset_id
        config.scenario = self.scenario
        return config

    def add_line(self, model, scenario, key, value):
        self.lines.append(f"{model}.{scenario}.{key} = {value}")

    def __repr__(self) -> str:
        return "\n".join(self.lines)

    def file_buffer(self):
        string = str(self)
        buffer = io.StringIO(string)
        return buffer
    
    def store_json(self, eid):
        res = requests.post(url=f"http://{CONFIG.MLPERF_STORAGE_SERVER}/config/{eid}", json=self.data)
        res = res.json()
        return res["config_id"]

    def store_file(self):
        res = requests.post(url=f"http://{CONFIG.FILE_STORAGE_SERVER}/", files={"": self.file_buffer()})
        id = res.text
        return id
    
    def get_id(self):
        return self.store()

    id = property(get_id)


@app.route("/start/<eid>/<selector>", methods=["POST"])
def start(eid, selector):
    global RUNNING_SELECTOR
    if JOB_LOCK.locked():
        return {"job_running": RUNNING_SELECTOR}, 409
    JOB_LOCK.acquire()
    try:
        data = request.get_json()
        configs = Config.from_dict(data, selector)
        _ = configs[0].store_json(eid)
        for config in configs:
            job_config_id = config.store_file()
            _ = K8S_Manager.createLGJob(eid, config.selector, [CONFIG.SUT_ADDRESS_K8S, CONFIG.MLPERF_STORAGE_SERVER_K8S, CONFIG.FILE_STORAGE_SERVER_K8S, job_config_id, config.dataset_id, config.scenario] + config.client_netem.to_args())
            RUNNING_SELECTOR = config.selector
            while K8S_Manager.is_job_running(config.selector):
                time.sleep(.5)
        JOB_LOCK.release()
        return "", 200
    except Exception as e:
        print(e)
        JOB_LOCK.release()
        abort(500)
        
    

@app.route("/running")
def get_running():
    if RUNNING_SELECTOR != -1:
        return {
            "selector": RUNNING_SELECTOR,
            "status": K8S_Manager.is_job_running(RUNNING_SELECTOR)
        }
    else:
        return {}

@app.route("/status/<selector>", methods=["GET"])
def job_status(selector):
    status = K8S_Manager.is_job_running(selector)
    if status is not None:
        return str(status)
    else:
        abort(404)

@app.route("/init_storage", methods=["POST"])
def init_storage():
    cifss_pod, cifss_svc = K8S_Manager.createCIFSS()
    storage_pod, storage_svc = K8S_Manager.createStorage()
    return {
        "cifss": {
            "pod": cifss_pod,
            "svc": cifss_svc
        },
        "storage": {
            "pod": storage_pod,
            "svc": storage_svc
        }
    }


if __name__=="__main__":
    CONFIG = BackendConfig()
    CONFIG.load_config()
    K8S_Manager = kubernetes_manager.KubernetesManager("./kube.yaml", CONFIG)
    app.run(debug=True, port=PORT, host="0.0.0.0",)