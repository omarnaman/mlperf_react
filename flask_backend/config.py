import json

class Config():
    LOADGEN_IMAGE = None
    SUT_IMAGE = None
    CIFSS_IMAGE = None
    STORAGE_IMAGE = None
    KUBERNETES_SERVER = None
    MLPERF_STORAGE_SERVER = None
    MLPERF_STORAGE_SERVER_K8S = None
    FILE_STORAGE_SERVER = None
    FILE_STORAGE_SERVER_K8S = None
    SUT_ADDRESS_K8S = None

    def load_config(self, path="backend_config.json"):
        with open(path, 'r') as f:
            config = json.load(f)
        
        self.LOADGEN_IMAGE = config["loadgen_image"]
        self.SUT_IMAGE = config["sut_image"]
        self.CIFSS_IMAGE = config["cifss_image"]
        self.STORAGE_IMAGE = config["storage_image"]
        self.MLPERF_STORAGE_SERVER = config["mlperf_storage_server"]
        self.MLPERF_STORAGE_SERVER_K8S = config["mlperf_storage_server_k8s"]
        self.FILE_STORAGE_SERVER = config["file_storage_server"]
        self.FILE_STORAGE_SERVER_K8S = config["file_storage_server_k8s"]
        self.SUT_ADDRESS_K8S = config["sut_address_k8s"]

        return self
