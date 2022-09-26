# MECBench Controller: Flask Backend API Reference

## **MECBench Services**
---

## Storage Services

MECBench uses two storage services: MECStore to store the results of the experiments and any configuration, CIFSS to store small blobs (LoadGen configuration files) to be used by the experiments.
### HTTP Request
`POST` /init_storage

Ensures that both the storage **services** and **pods** are deployed and running. If the storage service pods are not deployed, they will be deployed using the images specified in the `backend_config.json` under the names `cifss_image` and `storage_image`.

### Path Parameters
This endpoint has no path parameters.

### Body Parameters
This endpoint has no body parameters.


### Response

| Code | Description       |
| ---- | ----------------- |
| 200  | Request Succeeded |

### Response Body

| Parameter | Type           | Description                       |
| --------- | -------------- | --------------------------------- |
| cifss     | `ServiceState` | The state of the CIFSS service    |
| storage   | `ServiceState` | The state of the MECStore service |

#### **ServiceState**
| Parameter | Type      | Description                                                                                         |
| --------- | --------- | --------------------------------------------------------------------------------------------------- |
| pod       | `boolean` | Set to `false` if a service pod was already deployed and running, `true` if a new one was deployed. |
| svc       | `boolean` | Set to `false` if the service was already defined, `true` if a new one was defined.                 |

---

## System Under Test Service (SUT)
MECBench's SUT is deployed as a service and a pod, with plans to deploy multiple pods behind a load balancer. 
### HTTP Request
`POST` /sut

Ensures that both the SUT service and its pod are deployed. If a previous SUT pod was deployed, it will be deleted and a new one will be deployed using the image specified in the `backend_config.json` under the name `sut_image` with the configuration provided in the request's body.

### Path Parameters
This endpoint has no path parameters.


### Body Parameters
| Parameter      | Type             | Required | Description                                                                                      |
| -------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------ |
| node_selectors | `dict`           | No       | A dictionary of node selectors used for selecting which node to deploy the SUT pods on.          |
| netem          | `NetEmConfig`    | No       | The network emulation parameters sent to the network emulation module (TC). for the server-side. |
| limits         | `ResourceLimits` | No       | The resource limits applied on the SUT pods.                                                     |
| args           | `list`           | No       | A list of arguments to be passed to the SUT image.                                               |

### Response

| Code | Description       |
| ---- | ----------------- |
| 200  | Request Succeeded |

### Response Body

| Parameter | Type           | Description                                                                        |
| --------- | -------------- | ---------------------------------------------------------------------------------- |
| sut       | `ServiceState` | The state of the SUT service. The {pod} parameters is expected to be set to `true` |


#### **NetEmConfig** (Refer to [tc](https://wiki.linuxfoundation.org/networking/netem) for more information)
| Parameter | Type   | Description                                                                                           |
| --------- | ------ | ----------------------------------------------------------------------------------------------------- |
| bandwidth | String | The bandwidth to be emulated. Download rate when applied to SUT, upload rate when applied to LoadGen. |
| delay     | String | The single trip latency to be emulated.                                                               |
| jitter    | String | The latency jitter to be emulated.                                                                    |
| loss_rate | String | The percentage packet loss to be emulated, i.e, "50" is 50% if packets are dropped.                   |
| reorder   | String | The percentage of packets to be reordered on transmission.                                            |

#### **ResourceLimits** (Refer to [Kubernetes' documentation](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/))
| Parameter | Type   | Description                                                                                                                                                        |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| cpu       | string | See [K8's documentation](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/). e.g, "2" allows using up to `2` CPUs per pod.            |
| memory    | string | See [K8's documentation](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/). e.g, "128Mi" allows using up to `128` MegaBytes per pod. |

--- 


## Load Generator Service (LoadGen Server)
MECBench's LoadGen **Server/Service** is deployed as a service and a pod, launching a service that can be contacted to start a LoadGen instance on the same pod.

### HTTP Request
`POST` /lg_server
Ensures that both the SUT service and its pod are deployed. If a previous LoadGen Service pod was deployed, it will be deleted and a new one will be deployed using the image specified in the `backend_config.json` under the name `loadgen_server_image` with the configuration provided in the request's body.

### Path Parameters
This endpoint has no path parameters.


### Body Parameters
| Parameter | Type          | Required | Description                                                                                      |
| --------- | ------------- | -------- | ------------------------------------------------------------------------------------------------ |
| netem     | `NetEmConfig` | No       | The network emulation parameters sent to the network emulation module (TC), for the client-side. |
| args      | `list`        | No       | A list of arguments to be passed to the LoadGen Server image.                                    |


### Response

| Code | Description       |
| ---- | ----------------- |
| 200  | Request Succeeded |

### Response Body

| Parameter | Type           | Description                                                                             |
| --------- | -------------- | --------------------------------------------------------------------------------------- |
| lg_server | `ServiceState` | The state of the LoadGen service. The {pod} parameters is expected to be set to `true`. |

---

## Launching Experiments
MECBench provides multiple ways to launch experiments, launching an independent LoadGen instance for each experiment, or launching a single LoadGen Server instance and using it to launch multiple LoadGen experiments. 


## LoadGen Job
A LoadGen Job is a single LoadGen instance running a single experiment on an independent pod. This takes longer to finish due to the time it takes to deplay a new pod and fetch the dataset on each run.

### HTTP Request
`POST` /start/{eid}/{selector}

### Path Parameters
| Parameter | Description                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| eid       | The experiment's identifier, used to group related jobs in the storage service.                               |
| selector  | The job's identifier in the experiment, mostly used to indicate the number of clients running during the job. |


### Body Parameters
| Parameter  | Type                | Required | Description                                                                                                            |
| ---------- | ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| models     | List[LoadGenConfig] | Yes      | The configurations for different models in the experiment.                                                             |
| dataset_id | String              | Yes      | The dataset's identifier in the blob storage, currently the S3 storage link, e.g., `s3://mlperf-cocodatasets/300.tar`. |
| scenario   | String              | Yes      | The scenario to run the experiment on. Refer to LoadGen's scenarios for more details.                                  |
| repeats    | Integer             | No      | The number of times to repeat the experiment.                                                                          |
| netem      | `NetEmConfig`       | No       | The network emulation parameters sent to the network emulation module (TC), for the client-side.                       |

### Response

| Code | Description      |
| ---- | ---------------- |
| 200  | Experiment Done. |
| 500  | Error.           |

### Response Body
This endpoint returns an empty body.

## LoadGen instance
A LoadGen instance is a single LoadGen process ran by the LoadGen Server. This is faster than the LoadGen Job, as it doesn't require deploying a new pod for each experiment, but it requires the LoadGen Server to be running. The network emulation parameters are applied on the LoadGen Server, and the LoadGen instance will **inherit** the network emulation parameters from the LoadGen Server.

### HTTP Request
`POST` /lg_job/{eid}/{selector}


### Path Parameters
| Parameter | Description                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| eid       | The experiment's identifier, used to group related jobs in the storage service.                               |
| selector  | The job's identifier in the experiment, mostly used to indicate the number of clients running during the job. |


### Body Parameters
| Parameter  | Type                | Required | Description                                                                                                            |
| ---------- | ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| models     | List[LoadGenConfig] | Yes      | The configurations for different models in the experiment.                                                             |
| dataset_id | String              | Yes      | The dataset's identifier in the blob storage, currently the S3 storage link, e.g., `s3://mlperf-cocodatasets/300.tar`. |
| scenario   | String              | Yes      | The scenario to run the experiment on. Refer to LoadGen's scenarios for more details.                                  |
| repeats    | Integer             | No      | The number of times to repeat the experiment.                                                                          |

### Response

| Code | Description      |
| ---- | ---------------- |
| 200  | Experiment Done. |
| 500  | Error.           |

### Response Body
This endpoint returns an empty body.


#### **LoadGenConfig**
The LoadGenConfig is a JSON representation of the LoadGen's configuration, the most used parameters are listed in the following example:

```json
"models": [
        {
            "model_name": "*", // Apply to all model names
            "scenarios": [
                {
                    "scenario_name": "*", // Apply to all scenarios
                    "config": {
                        "num_threads": "1", // The number of concurrent clients
                        "max_duration": "10000", // The maximum duration of the experiment in milliseconds
                        "min_duration": "10000", // The minimum duration of the experiment in milliseconds
                        "target_qps": "800", // The targeted throughput in queries per second in the MultiStream Scenario PER CLIENT
                        "mode": "2", // The mode of the experiment, 2 is PerformanceOnly
                        "samples_per_query": "1", // The number of samples to send per query
                        "max_async_queries": "1" // The maximum number of concurrent queries per client 
                    }
                }
            ]
        }
    ],
```
