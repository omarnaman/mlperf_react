var express = require('express');
var cors = require('cors');
var app = express();
var http = require("http");
var uuid = require("uuid");
const PORT = 8081;

app.use(cors())

var IS_RUNNING = {};
const SERIES_SIZE = 100;

const STORAGE_IP = process.argv[2]

/**
 * A class responsible for generating unique IDs (uuids for now)
 */
class IdGenerator {
    /**
     * 
     * @returns {string} a new unique id (uuid v4) as a string
     */
    static GetNewID() {
        return uuid.v4()
    }
}

/**
 * sends the results to the storage service
 * @param {*} results an object containing the results of an "experiment" as {dataX}, {dataY}, and {id} the id of the job 
 */
function SendToStorage(results) {
    data = JSON.stringify({dataX: results.dataX, dataY: results.dataY, id: results.id})
    const options = {
        hostname: STORAGE_IP,
        port: 8082,
        path: `/StoreResults/${results.id}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }
    const req = http.request(options, (res) => {
        console.log('Storage Request statusCode:', res.statusCode)
    })
    req.write(data)
    req.end()
}

/**
 * generate synthetic data to be the results of an "experiment" for visualizing and plotting
 * @param {*} job the description of the job {"clients" as the number of clients}
 * @returns a generated series representing the results of the "experiment"
 */
function generateSeries(job) {
    seriesX = []
    seriesY = []
    for (let i = 1; i <= SERIES_SIZE; i++) {
        seriesX.push(i)
        seriesY.push(i * job.clients)
    }
    return { dataX: seriesX, dataY: seriesY }
}

/**
 * "Run" a job; generate synthetic results and send them to storage
 * @param {*} job the description of the job {"clients" as the number of clients, "id" as the id of the job, "timeMs" as the time slept before generating data}
 */
function RunJob(job) {
    IS_RUNNING[job.id] = true
    return new Promise(resolve => {
        setTimeout(() => {
            data = generateSeries(job)
            results = { id: job.id, dataX: data.dataX, dataY: data.dataY }
            //console.log(results)
            SendToStorage(results)
            IS_RUNNING[job.id] = false
            console.log("Job {%s} resolved", job.id)
            resolve('resolved')
        }, job.timeMs)
    })
}

/**
 * Check if a god with :id is running
 * @param {string} id the id of a job
 * @returns {object} {"id": id, "isRunning": bool}
 */
app.get('/IsRunning/:id', function (req, res) {
    var isRunning = IS_RUNNING[req.params.id]
    resultObject = { id: req.params.id, isRunning }
    result = JSON.stringify(resultObject)
    res.end(result)
    
})

/**
 * Check if a god with :id is running
 * @param {number} clients the number of clients in the experiment, affects the scaling of the results
 * @param {number} time the number of seconds the experiment should run for
 * @returns {object} the job description with the assigned ID.
 */
app.get('/StartJob/:clients/:time', function (req, res) {
    resultObject = { id: IdGenerator.GetNewID(), timeMs: req.params.time * 1000, clients: req.params.clients }
    result = JSON.stringify(resultObject)
    RunJob(resultObject)
    res.end(result)

})

app.get('/test', function (req, res) {
    res.end(JSON.stringify({test:"works"}))
})

var server = app.listen(PORT, function () {
    console.log("Listening on http://0.0.0.0:%s", PORT)
})