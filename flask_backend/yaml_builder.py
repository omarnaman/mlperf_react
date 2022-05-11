import yaml

class Metadata:
    def __init__(self, id, label) :
        self.name = id;
        self.labels = {
            "name": label
        }

class Container:
    def __init__(self, image, name, args=None, imagePullPolicy=None, command=None):
        self.image = image
        self.name = name
        self.args = args
        self.imagePullPolicy = imagePullPolicy
        self.command = command
    


class JobSpec:
    def __init__(self, args):
        self.containers = [
            Container("loadgen", "lg", args, "Never", None),
        ]
        self.initContainers = [
            Container("busybox", "wait-sut", None, None, ["sh", "-c", "wget sut:8086 2>&1 | grep refused; while [[ $? == 0 ]]; do sleep 2; wget sut:8086 2>&1 | grep refused; done;"])]
        self.restartPolicy= "Never"
    


# eid and selector accept strings, args accepts an array of strings
def createJobYAML(eid, selector, args) -> str:
    args_full = [eid, selector].extend(args)
    o = {
        "apiVersion":"batch/v1",
        "kind": "Job",
        "metadata": Metadata(selector, "lg"),
        "spec": {
            "ttlSecondsAfterFinished": 10,
            "template": {
                "spec": JobSpec(args_full)
            }
        }
    }
    return yaml.dump(o)




# createJobYAML("testing", "1", ["--scenario", "SingleStream", "--threads", "1"]), {"quotingType":'"'}