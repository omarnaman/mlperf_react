#!/usr/bin/env python3

import flask
from flask import request
import sqlite3

app = flask.Flask(__name__)
PORT = 8082;


class SQLiteDB():
    def __init__(self, filepath="data.db") -> None:
        self.filepath = filepath
        self.connection = sqlite3.connect(self.filepath)
        self._create_tables()

    def _create_tables(self):
        self.connection.execute(
            "CREATE TABLE IF NOT EXISTS qps(experiment_id, selector, qps)")
        self.connection.execute(
            "CREATE TABLE IF NOT EXISTS latencies(experiment_id, selector, latencies)")

    def print_all(self) -> None:
        print("print_all")
        cursor = self.connection.cursor()
        for row in cursor.execute("SELECT experiment_id, selector, qps FROM qps"):
            print(row)
        for row in cursor.execute("SELECT experiment_id, selector, latencies FROM latencies"):
            print(row)

    def add_qps(self, eid, selector, qps):
        print(f"Adding {eid}, {selector}, {qps}")
        cursor = self.connection.cursor()
        cursor.execute(
            "INSERT INTO qps(experiment_id, selector, qps) \
                VALUES(?, ?, ?)", (eid, selector, qps))
        self.connection.commit()

    def add_latencies(self, eid, selector, latencies):
        print(f"Adding {eid}, {selector}, {latencies}")
        
        ls = ",".join(map(str, latencies))
        cursor = self.connection.cursor()
        cursor.execute(
            "INSERT INTO latencies(experiment_id, selector, latencies) \
                VALUES(?, ?, ?)", (eid, selector, ls))
        self.connection.commit()

    def get_qps(self, eid):
        cursor = self.connection.cursor()
        sql = "SELECT experiment_id, selector, qps FROM qps WHERE experiment_id=?"
        res = []
        for row in cursor.execute(sql, (eid, )):
            json = {
                "experiment_id": row[0],
                "selector": row[1],
                "qps": row[2],
            }
            res.append(json.copy())
        return res

    def get_latencies(self, eid):
        cursor = self.connection.cursor()
        sql = "SELECT experiment_id, selector, latencies FROM latencies WHERE experiment_id=?"
        res = []
        for row in cursor.execute(sql, (eid, )):
            json = {
                "experiment_id": row[0],
                "selector": row[1],
                "latencies": row[2],
            }
            res.append(json.copy())
        return res

@app.route("/qps", methods=["POST"])
def add_qps():
    db = SQLiteDB()
    data = request.get_json()
    eid = data["experiment_id"]
    selector = data["selector"]
    qps = data["qps"]
    db.add_qps(eid, selector, qps)
    return "Done"

@app.route("/latencies", methods=["POST"])
def add_latencies():
    db = SQLiteDB()
    data = request.get_json()
    eid = data["experiment_id"]
    selector = data["selector"]
    latencies = data["latencies"]
    db.add_latencies(eid, selector, latencies)
    return "Done"

@app.route("/print", methods=["GET"])
def print_all():
    db = SQLiteDB()
    db.print_all()
    return "Done"

@app.route("/qps/<eid>", methods=["GET"])
def get_qps(eid: str):
    db = SQLiteDB()
    return flask.jsonify(db.get_qps(eid))

@app.route("/latencies/<eid>", methods=["GET"])
def get_latencies(eid: str):
    db = SQLiteDB()
    return flask.jsonify(db.get_latencies(eid))

if __name__=="__main__":
    app.run(debug=True, port=PORT, host="0.0.0.0",)