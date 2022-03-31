const yaml = require('js-yaml');

class metadata {
    constructor(id, label) {
        this.name = id;
        this.labels = {
            name: label
        }
    }
}

class container {
    constructor(image, name, args, imagePullPolicy, command) {
        this.image = image
        this.name = name
        if (args) {
            this.args = args
        }
        if (imagePullPolicy) {
            this.imagePullPolicy = imagePullPolicy
        }
        if (command) {
            this.command = command
        }
    }
}

class JobSpec {
    constructor(args) {
        this.containers = [
            new container("loadgen", "lg", args, "Never", null),
        ]
        this.initContainers = [
            new container("busybox", "wait-sut", null, null, ["sh", "-c", "wget sut:8086 2>&1 | grep refused; while [[ $? == 0 ]]; do sleep 2; wget sut:8086 2>&1 | grep refused; done;"])]
        this.restartPolicy= "Never"
    }
}

function createJobYAML(eid, selector, args) {
    args_full = [eid, selector].concat(args)
    o = {
        apiVersion:"batch/v1",
        kind: "Job",
        metadata: new metadata(selector, "lg"),
        spec: {
            ttlSecondsAfterFinished: 10,
            template: {
                spec: new JobSpec(args_full)
            }
        }
    }
    return o
}



// body = yaml.dump(createJobYAML("testing", "1", ["--scenario", "SingleStream", "--threads", "1"]), {"quotingType":'"'})