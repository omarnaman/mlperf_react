#!/usr/bin/env python3

import flask
from flask_cors import CORS, cross_origin
from flask import request, abort
from flask_sqlalchemy import SQLAlchemy
import json
from werkzeug.exceptions import HTTPException

app = flask.Flask(__name__, instance_relative_config=True)
CORS(app)
PORT = 8082;

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

        

class Experiment(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    experiment_id = db.Column(db.String, unique = True)
    config_id = db.Column(db.Integer)
    
    def __init__(self, eid, config_id=-1) -> None:
        self.experiment_id = eid
        self.config_id = config_id

    def add(eid, config_id=-1):
        query = db.session.query(Experiment).filter_by(experiment_id=eid)
        exp = query.first()
        if exp:
            query.update({Experiment.config_id: config_id})
            return exp.id
        exp = Experiment(eid, config_id)
        db.session.add(exp)
        db.session.commit()
        return exp.id

    def get_all():
        res = []
        exps: "list[Experiment]" = db.session.query(Experiment.experiment_id).all()
        for exp in exps:
            res.append(exp.experiment_id)
        return {"experiments": list(res)}

    def get(eid):
        exp: Experiment = db.session.query(Experiment).filter_by(experiment_id=eid).first()
        if exp is not None:
            return exp.dict()
        return None

    def dict(self) -> dict:
        return {
            "id": self.id,
            "experiment_id": self.experiment_id,
            "config_id": self.config_id
            }

    def __repr__(self) -> str:
        return json.dumps(self.dict(), indent=2)
    

    def delete(eid):
        db.session.query(Experiment).filter_by(experiment_id=eid).delete()
        db.session.commit()

class Config(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    config_json = db.Column(db.UnicodeText)
    
    def __init__(self, config_json: str) -> None:
        self.config_json = config_json

    def add(config_json):
        if isinstance(config_json, dict):
            config_json = json.dumps(config_json)
        config = Config(config_json)
        db.session.add(config)
        db.session.commit()
        return config.id

    
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
    
    def delete(eid):
        db.session.query(LatencyResult).filter_by(experiment_id=eid).delete()
        db.session.commit()

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

    def delete(eid):
        db.session.query(QPSResult).filter_by(experiment_id=eid).delete()
        db.session.commit()

@app.route("/qps", methods=["POST"])
def add_qps():
    try:
        data = request.get_json()
        eid = data["experiment_id"]
        selector = data["selector"]
        qps = data["qps"]
        QPSResult.add_qps(eid, selector, qps)
        return {"Added": True}, 200
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
        return {"Added": True}, 200
    except:
        abort(500)

@app.route("/config/<eid>", methods=["POST"])
def add_config(eid):
    try:
        config = request.get_json()
        config_id = Config.add(config)
        exp_id = Experiment.add(eid, config_id)
        return {"Added": True, "config_id": config_id, "experiment_id": exp_id}, 200
    except Exception as e:
        print(e)
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
        
@app.route("/experiments/<eid>", methods=["GET"])
@cross_origin()
def get_experiment(eid):
    try:
        exp = Experiment.get(eid)
        if exp:
            return flask.jsonify(exp), 200
        else:
            return "", 404
    except:
        abort(500)

@app.route("/delete/<eid>", methods=["POST"])
@cross_origin()
def delete_results(eid):
    try:
        Experiment.delete(eid)
        LatencyResult.delete(eid)
        QPSResult.delete(eid)
        return "", 200
    except:
        abort(500)

@app.route("/delete_all/", methods=["POST"])
@cross_origin()
def delete_all_results():
    try:
        eids = Experiment.get_all()["experiments"]
        for eid in eids:
            Experiment.delete(eid)
            LatencyResult.delete(eid)
            QPSResult.delete(eid)
        return "", 200
    except:
        abort(500)



if __name__=="__main__":
    db.create_all()
    app.run(debug=True, port=PORT, host="0.0.0.0",)