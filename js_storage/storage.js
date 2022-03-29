const { assert } = require('console');
var express = require('express');
var cors = require('cors');
var app = express();
const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');
const PORT = 8082;
app.use(express.json())
app.use(cors())

/**
 * A wrapper around the sqlite/sqlite3 driver
 */
class SQLiteDB {
    constructor(filepath = "data.db") {
        this.filepath = filepath
        this._init()
    }

    async _init() {
        this.db = await sqlite.open({
            filename: this.filepath,
            driver: sqlite3.Database
        })
        this.db.run(`CREATE TABLE IF NOT EXISTS 
                        qps(experiment_id, selector, qps)`)
        this.db.run(`CREATE TABLE IF NOT EXISTS 
                        latencies(experiment_id, selector, latencies)`)
    }
    /**
     * insert qps results into the qps table
     * @param {string} eid the id of the experiment 
     * @param {string} selector the selector of a point in the experiment
     * @param {float} qps the qps of the job
     */
    async addQPS(eid, selector, qps) {
        let sql = "INSERT INTO qps(experiment_id, selector, qps) \
        VALUES(?, ?, ?)"
        const _ = await this.db.run(sql, [eid, selector, qps])
    }

    /**
     * insert latency results into the latencies table
     * @param {string} eid the id of the experiment 
     * @param {string} selector the selector of a point in the experiment
     * @param {Array} latencies the latencies of the samples sent by the job
     */
    async addLatencies(eid, selector, latencies) {
        let ls = latencies.join(",")
        let sql = "INSERT INTO latencies(experiment_id, selector, latencies) \
        VALUES(?, ?, ?)"
        const _ = await this.db.run(sql, [eid, selector, ls])
    }

    /**
     * get the qps results of the jobs with the provided experiment id 
     * @param {string} eid id of the experiment
     * @returns {Array} a list of the selected rows 
     */
    async getQPS(eid) {
        let sql = `SELECT experiment_id, selector, qps 
                FROM qps 
                WHERE experiment_id=?`
        let results = []
        let rows = await this.db.all(sql, [eid])
        rows.forEach(row => {
            results.push({
                experiment_id: row.experiment_id,
                selector: row.selector,
                qps: row.qps
            })
        })
        return results
    }

    /**
     * get the latency results of the jobs with the provided 
     *  experiment id 
     * @param {string} eid id of the experiment
     * @returns {Array} a list of the selected rows 
     */
    async getLatencies(eid) {
        let sql = `SELECT experiment_id, selector, latencies 
                FROM latencies 
                WHERE experiment_id=?`
                let results = []
        let rows = await this.db.all(sql, [eid])
        rows.forEach(row => {
            results.push({
                experiment_id: row.experiment_id,
                selector: row.selector,
                qps: row.latencies
            })
        })
        return results
    }
}

var DB = new SQLiteDB();

/**
 * Store the results of the experiment with :eid, the results 
 *  of the experiment should be in the payload as 
 *  {eid} the id of the experiment 
 *  {selector} as the id of the job/point in the experiment 
 *  {qps}: the latencies of the samples sent by the job
 */
app.post('/qps/', function (req, res) {
    eid = req.body.experiment_id
    selector = req.body.selector
    qps = req.body.qps
    DB.addQPS(eid, selector, qps)
    res.end()
})

/**
 * Store the results of the experiment with :eid, the results 
 *  of the experiment should be in the payload as 
 *  {eid} the id of the experiment 
 *  {selector} as the id of the job/point in the experiment 
 *  {latencies}: the latencies result of the job
 */
app.post('/latencies/', function (req, res) {
    eid = req.body.experiment_id
    selector = req.body.selector
    latencies = req.body.latencies
    DB.addLatencies(eid, selector, latencies)
    res.end()
})

/**
 * Get the qps of an experiment's jobs
 * @param {string} id the id of the experiment
 */
app.get('/qps/:eid', async (req, res) => {
    results = await DB.getQPS(req.params.eid)
    res.end(JSON.stringify(results))
})

/**
 * Get the latencies of an experiment's jobs
 * @param {string} id the id of the experiment
 */
app.get('/latencies/:eid', async (req, res) => {
    results = await DB.getLatencies(req.params.eid)
    res.end(JSON.stringify(results))
})

var server = app.listen(PORT, function () {
    console.log("Listening on http://0.0.0.0:%s", PORT)
})