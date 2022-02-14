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
    constructor(filepath = ":memory:") {
        this.filepath = filepath
        this._init()
    }

    async _init() {
        this.db = await sqlite.open({
            filename: this.filepath,
            driver: sqlite3.Database
        })
        this.db.run('CREATE TABLE results(ID, X, Y)')
    }
    
    /**
     * prints all rows in the results table
     */
    printAll() {
        let sql = `SELECT ID, X, Y FROM results`
        this.db.each(sql, [], (err, row) => {
            console.log({ dataX: row.X.split(','), dataY: row.Y.split(','), id: id })
        })
    }

    /**
     * returns all the rows in the results table
     * @returns {Array} {"dataX": Array, "dataY": Array, id: string}
     */
    async getAll() {
        let results = []
        let sql = `SELECT ID, X, Y FROM results`

        let x = await this.db.all(sql, [])
        x.forEach(row => {
            results.push({ dataX: row.X.split(','), dataY: row.Y.split(','), id: id })
        })
        return results

    }

    /**
     * insert results into the results table
     * @param {string} id the id of the job 
     * @param {Array} X the X series of the results 
     * @param {Array} Y the Y series of the results
     */
    async addResults(id, X, Y) {
        const _ = await this.db.run(`INSERT INTO results(ID, X, Y) VALUES(?, ?, ?)`, [id, X.join(","), Y.join(",")])
    }

    /**
     * get the results of the job with the provided id 
     * @param {string} id id of the job
     * @returns {Array} the rows with the provided id
     */
    async getResults(id) {
        let sql = `SELECT ID, X, Y
            FROM results
            WHERE ID = ?`
        let results = []
        let rows = await this.db.all(sql, [id])
        rows.forEach(row => {
            results.push({ dataX: row.X.split(','), dataY: row.Y.split(','), id: id })
        })
        return results
    }
}

var DB = new SQLiteDB();

/**
 * Store the results of the experiment with :id, the results of the experiment should be in the payload as {dataX}, {dataY}, and {id} the id of the job 
 * @param {string} id the id of the job
 */
app.post('/StoreResults/:id', function (req, res) {
    dataX = req.body.dataX
    dataY = req.body.dataY
    assert(req.body.id == req.params.id, `params: ${req.params.id}, body: ${req.body.id}`)
    id = req.body.id
    DB.addResults(id, dataX, dataY)
    res.end()

})

/**
 * Get the results of a single job
 * @param {string} id the id of the job
 */
app.get('/GetResults/:id', async (req, res) => {
    results = await DB.getResults(req.params.id)
    res.end(JSON.stringify(results))

})

/**
 * Get the results of all jobs
 */
app.get('/GetALL/', async (req, res) => {
    results = await DB.getAll()
    res.end(JSON.stringify(results))

})


var server = app.listen(PORT, function () {
    console.log("Listening on http://0.0.0.0:%s", PORT)
})