#!/usr/bin/python3
"""
module for the beginning of greatness
"""
from flask import jsonify, Flask, Blueprint, request, abort
from flask_cors import CORS
import json

app = Flask(__name__)
corsInstance = CORS(app, resources={r"/*": {"origins": "*"}})

regList = []
loginList = []


@app.errorhandler(404)
def errorHandler(e):
    """404 error handling"""
    return jsonify(error='Not found'), 404


@app.route('/')
def index():
    return jsonify({'hello': 'there'})


@app.route('/registration', methods=['GET'])
def get_registration():
    # should i hash the password and store in db here?
    """gets registration information"""
    return jsonify(regList)


@app.route('/registration', methods=['POST'])
def post_registration():
    # should i hash the password and store in db here?
    """gets registration information"""
    regData = request.get_json()
    regList.append(regData)
    return jsonify(regList)


@app.route('/registration', methods=['GET'])
def get_registration():
    # should i hash the password and store in db here?
    """gets registration information"""
    return jsonify(loginList)


@app.route('/registration', methods=['POST'])
def post_registration():
    # should i hash the password and store in db here?
    """gets registration information"""
    loginData = request.get_json()
    loginList.append(loginData)
    return jsonify(regList)





if __name__ == "__main__":
    app.run(debug=True)
