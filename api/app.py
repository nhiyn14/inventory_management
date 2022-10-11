#!/usr/bin/python3
"""
module for the beginning of greatness
"""
import hashlib
import pydash
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
    regDict = regData['registrationValues']
    email = regDict['email']
    password = regDict['password']
    hashedPassword = hashlib.md5(password.encode())
    return jsonify(regList)


@app.route('/login', methods=['GET'])
def get_login():
    """gets login information"""
    return jsonify(loginList)


@app.route('/login', methods=['POST'])
def post_login():
    """gets registration information"""
    loginData = request.get_json()
    loginDict = loginData['loginValues']
    password = loginDict['password']
    # compare password with db
    loginList.append(loginData)
    return jsonify(loginList)


@app.route('/dashboard', methods=['POST'])
def post_dashboard():
    """posts data from dashboard form"""
    dashboardData = request.get_json()


if __name__ == "__main__":
    app.run(debug=True)
