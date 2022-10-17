#!/usr/bin/python3
"""
module for the beginning of greatness
"""
import hashlib
import pydash
from flask import jsonify, Flask, Blueprint, request, abort
from flask_cors import CORS
import json
from flask_jwt_extended import create_access_token, get_jwt, jwt_required
from flask_jwt_extended import get_jwt_identity, unset_jwt_cookies
from flask_jwt_extended import JWTManager
from datetime import datetime, timedelta, timezone

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
jwt = JWTManager(app)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
corsInstance = CORS(app, resources={r"/*": {"origins": "*"}})


regList = []
loginList = []
dashboardList = []


@app.route('/login', methods=['POST'])
def create_token():
    """gets registration information"""
    loginData = request.get_json()
    loginValues = loginData['loginValues']
    email = loginValues['email']
    password = loginValues['password']
    loginList.append(loginData)
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token": access_token}
    return response


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
    print(regData)
    email = regData['email']
    password = regData['password']
    firstName = regData['firstName']
    hashedPassword = hashlib.md5(password.encode())
    print("email:", email, "password:", hashedPassword)
    return jsonify(regList)


@app.route('/login', methods=['GET'])
def get_login():
    """gets login information"""
    return jsonify(loginList)


@app.route('/dashboard', methods=['POST'])
def post_dashboard():
    """posts data from dashboard form"""
    dashboardData = request.get_json()
    dashValues = dashboardData['dashboardValues']
    dashboardList.append(dashValues)
    dashboardData = request.get_json()


@app.route('/dashboard', methods=['GET'])
def get_dashboardForm():
    """retrieves data from dashboard form"""
    dashboardData = request.get_json()


if __name__ == "__main__":
    app.run(debug=True)
