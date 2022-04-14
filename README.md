# MLPerf Storage Service

This is the implementation of the storage service for MLPerf results QPS and latency results, written in both JS (Express) and Python (Flask).


# Endpoints
The service has mainly **two** endpoints: /qps and /latencies, serving the QPS and latency results accordingly.

## /qps

### `POST` /qps/
| Parameter Name | Description                                                                                     | Type   |
| -------------- | ----------------------------------------------------------------------------------------------- | ------ |
| experiment_id  | The ID of the experiment that the QPS is associated with. Used to select multiple related jobs. | String |
| selector       | The ID of a specific job that the QPS is associated with.                                       | String |
| qps            | The QPS result of the job.                                                                      | Float  |
---
### `GET` /qps/{experiment_id}
This operation has no extra parameters. 
### **Returns** the list of QPS results associated with the Experiment ID, one for each job.
```json
[
    {
        "experiment_id": "{experiment_id: String}",
        "selector": "{job_selector: String}",
        "qps": "{QPS_Result: float}"
    }

]
```

---

## /latencies

### `POST` /latencies/
| Parameter Name | Description                                                                                                   | Type        |
| -------------- | ------------------------------------------------------------------------------------------------------------- | ----------- |
| experiment_id  | The ID of the experiment that the list of latencies is associated with. Used to select multiple related jobs. | String      |
| selector       | The ID of a specific job that the list of latencies is associated with.                                       | String      |
| latencies      | The list of latency results of the job, one for each sample in the job.                                                    | List[Float] |
---
### `GET` /latencies/{experiment_id}
This operation has no extra parameters. 
### **Returns** the list of latency results associated with the Experiment ID, one for each job.
```json
[
    {
        "experiment_id": "{experiment_id: String}",
        "selector": "{job_selector: String}",
        "latencies": "{Latency_Results: comma-separated floats}"
    }

]
```
## /experiments

### `GET` /experiments/ 
This operation has no extra parameters. 
### **Returns** the list of latency results associated with the Experiment ID, one for each job.
```json
{
    "experiments" : [
        eid1,
        eid2,
        .
        .
        .
    ]
}
```
