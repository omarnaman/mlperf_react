#!/usr/bin/env python3

import flask
from flask_cors import CORS, cross_origin
from flask import request, abort
import json
import requests
import io
import time
import yaml_builder
from threading import Lock

app = flask.Flask(__name__)
CORS(app)
PORT = 8083;

KUBERNETES_SERVER = "localhost:8001"
MLPERF_STORAGE_SERVER = "localhost:8082"
MLPERF_STORAGE_SERVER_K8S = "localhost:8082"
FILE_STORAGE_SERVER = "localhost:5000"
FILE_STORAGE_SERVER_K8S = "localhost:5000"
SUT_ADDRESS_K8S = "localhost:8086"
JOB_LOCK = Lock()
RUNNING_SELECTOR = -1

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
        config.selector = selector
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
                i_config.selector = i
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
        res = requests.post(url=f"http://{MLPERF_STORAGE_SERVER}/config/{eid}", json=self.data)
        res = res.json()
        return res["config_id"]

    def store_file(self):
        res = requests.post(url=f"http://{FILE_STORAGE_SERVER}/", files={"": self.file_buffer()})
        id = res.text
        return id
    
    def get_id(self):
        return self.store()

    id = property(get_id)

def start_k8_job(yaml):
    endpoint = f"http://{KUBERNETES_SERVER}/apis/batch/v1/namespaces/default/jobs"
    result = requests.post(url=endpoint, data=yaml, headers={'Content-Type': 'application/yaml'})
    return result.status_code



def k8_job_status(selector):
    endpoint = f"http://{KUBERNETES_SERVER}/apis/batch/v1/namespaces/default/jobs/{selector}"
    result = requests.post(url=endpoint)
    data = result.json()
    if result.status_code == requests.codes.OK:
        status = data["status"]["active"]
        return status
    return None

@app.route("/start/<eid>/<selector>", methods=["POST"])
def start(eid, selector):
    global RUNNING_SELECTOR
    if JOB_LOCK.locked():
        return {"job_running": RUNNING_SELECTOR}, 409
    JOB_LOCK.acquire()
    dataset_id = 1
    try:
        data = request.get_json()
        configs = Config.from_dict(data, selector)
        config_id = configs[0].store_json(eid)
        for config in configs:
            job_config_id = config.store_file()
            yaml_request = yaml_builder.createJobYAML(eid, config.selector, [SUT_ADDRESS_K8S, MLPERF_STORAGE_SERVER_K8S, FILE_STORAGE_SERVER_K8S, job_config_id, dataset_id, config.scenario] + config.client_netem.to_args())
            start_k8_job(yaml_request)
            RUNNING_SELECTOR = config.selector
            while k8_job_status(config.selector):
                time.sleep(.5)
        JOB_LOCK.release()
        return "", 200
    except Exception as e:
        print(e)
        JOB_LOCK.release()
        abort(500)
        
    

@app.route("/status/<selector>", methods=["GET"])
def job_status(selector):
    status = k8_job_status(selector)
    if status is not None:
        return status
    else:
        abort(404)


if __name__=="__main__":
    app.run(debug=True, port=PORT, host="0.0.0.0",)