import yaml


def quoted_presenter(dumper, data):
    return dumper.represent_scalar('tag:yaml.org,2002:str', data, style='"')

yaml.add_representer(str, quoted_presenter)

class Metadata:
    def __init__(self, id, label) :
        self.name = id;
        self.labels = {
            "name": label
        }
    def to_dict(self):
        d = {
            "name": self.name,
            "labels": self.labels
        }
        keys = list(d.keys())
        for key in keys:
            if d[key] is None:
                del d[key]
        return d

class Container:
    def __init__(self, image, name, args=None, imagePullPolicy=None, command=None):
        self.image = image
        self.name = name
        self.args = args
        self.imagePullPolicy = imagePullPolicy
        self.command = command
    
    def to_dict(self):
        d = {
            "image": self.image,
            "name": self.name,
            "imagePullPolicy": self.imagePullPolicy,
        }
        if self.args is not None:
            d.update(
            {"args": [f'{arg}' for arg in self.args]})
        if self.command is not None:
            d.update(
            {"command": [f'{c}' for c in self.command]})

        keys = list(d.keys())
        for key in keys:
            if d[key] is None:
                del d[key]
        return d


class JobSpec:
    def __init__(self, args):
        self.containers = [
            Container("loadgen", "lg", args, "Never", None),
        ]
        self.initContainers = [
            Container("busybox", "wait-sut", None, None, ["sh", "-c", "wget sut:8086 2>&1 | grep refused; while [[ $? == 0 ]]; do sleep 2; wget sut:8086 2>&1 | grep refused; done;"])]
        self.restartPolicy= "Never"
    
    def to_dict(self):
        d = {
            "conatiners": [container.to_dict() for container in self.containers],
            "initContainers": [container.to_dict() for container in self.initContainers],
            "restartPolicy": self.restartPolicy
        }
        keys = list(d.keys())
        for key in keys:
            if d[key] is None:
                del d[key]
        return d


# eid and selector accept strings, args accepts an array of strings
def createJobYAML(eid, selector, args) -> str:
    args_full = [eid, selector]
    args_full.extend(args)
    o = {
        "apiVersion":"batch/v1",
        "kind": "Job",
        "metadata": Metadata(selector, "lg").to_dict(),
        "spec": {
            "ttlSecondsAfterFinished": 10,
            "template": {
                "spec": JobSpec(args_full).to_dict()
            }
        }
    }
    return yaml.dump(o)




# createJobYAML("testing", "1", ["--scenario", "SingleStream", "--threads", "1"]), {"quotingType":'"'}