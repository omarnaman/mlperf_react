#!/usr/bin/env python3

import flask
from flask_cors import CORS, cross_origin
from flask import request, abort
from flask_sqlalchemy import SQLAlchemy

app = flask.Flask(__name__, instance_relative_config=True)
CORS(app)
PORT = 8082;

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

        

class Experiment(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    experiment_id = db.Column(db.String, unique = True)

    def __init__(self, eid) -> None:
        self.experiment_id = eid

    def add(eid):
        query = db.session.query(Experiment).filter_by(experiment_id=eid)
        exists = db.session.query(query.exists()).scalar()
        if exists:
            return False
        exp = Experiment(eid)
        db.session.add(exp)
        db.session.commit()
        return True

    def get_all():
        res = []
        exps: "list[Experiment]" = db.session.query(Experiment.experiment_id).all()
        for exp in exps:
            res.append(exp.experiment_id)
        return {"experiments": list(res)}
        
    
    
class LatencyResult(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    experiment_id = db.Column(db.String)
    selector = db.Column(db.String)
    latencies = db.Column(db.String)

    def __init__(self, experiment_id, selector, latencies: "list[float]"):
        self.experiment_id = experiment_id
        self.selector = selector
        self.latencies = ",".join(map(str, latencies))
    
    def add_latencies(eid, selector, latencies: "list[float]"):
        Experiment.add(eid)
        print(f"Adding {eid}, {selector}, {latencies}")
        row = LatencyResult(eid, selector, latencies)
        db.session.add(row)
        db.session.commit()

    def get_latencies(eid):
        res = []
        for row in db.session.query(LatencyResult).filter_by(experiment_id=eid):
            json = {
                "experiment_id": row.experiment_id,
                "selector": row.selector,
                "latencies": row.latencies,
            }
            res.append(json.copy())
        return res

class QPSResult(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    experiment_id = db.Column(db.String)
    selector = db.Column(db.String)
    qps = db.Column(db.Float)

    def __init__(self, experiment_id, selector, qps: float):
        self.experiment_id = experiment_id
        self.selector = selector
        self.qps = qps
    
    def add_qps(eid, selector, qps: float):
        Experiment.add(eid)
        print(f"Adding {eid}, {selector}, {qps}")
        row = QPSResult(eid, selector, qps)
        db.session.add(row)
        db.session.commit()

    def get_qps(eid):
        res = []
        for row in db.session.query(QPSResult).filter_by(experiment_id=eid):
            json = {
                "experiment_id": row.experiment_id,
                "selector": row.selector,
                "qps": row.qps,
            }
            res.append(json.copy())
        return res

@app.route("/qps", methods=["POST"])
def add_qps():
    try:
        data = request.get_json()
        eid = data["experiment_id"]
        selector = data["selector"]
        qps = data["qps"]
        QPSResult.add_qps(eid, selector, qps)
        return '{"Added": True}', 200
    except:
        abort(500)

@app.route("/latencies", methods=["POST"])
def add_latencies():
    try:
        data = request.get_json()
        eid = data["experiment_id"]
        selector = data["selector"]
        latencies = data["latencies"]
        LatencyResult.add_latencies(eid, selector, latencies)
        return '{"Added": True}', 200
    except:
        abort(500)


@app.route("/qps/<eid>", methods=["GET"])
@cross_origin()
def get_qps(eid: str):
    try:
        return flask.jsonify(QPSResult.get_qps(eid))
    except:
        abort(500)

@app.route("/latencies/<eid>", methods=["GET"])
@cross_origin()
def get_latencies(eid: str):
    try:
        return flask.jsonify(LatencyResult.get_latencies(eid))
    except:
        abort(500)

@app.route("/experiments", methods=["GET"])
@cross_origin()
def get_experiments():
    try:
        return flask.jsonify(Experiment.get_all())
    except:
        abort(500)

if __name__=="__main__":
    db.create_all()
    app.run(debug=True, port=PORT, host="0.0.0.0",)