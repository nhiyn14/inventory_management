#!/usr/bin/python3
"""
module for the beginning of greatness
"""
import email
import hashlib
import pydash
from flask import jsonify, Flask, Blueprint, request, abort
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

# creating flask app
app = Flask(__name__)

# setting upn flask-jwt-extended extension
app.config["JWT_SECRET_KEY"] = "JWT_TOKEN"  # Change this!
jwt = JWTManager(app)
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


# @app.route('/login', methods=['GET'])
# def get_login():
#     """gets login information"""
#     return jsonify(loginList)


# @app.route('/login', methods=['POST'])
# def post_login():
#     """gets registration information"""
#     loginData = request.get_json()
#     loginDict = loginData['loginValues']
#     password = loginDict['password']
#     # compare password with db
#     loginList.append(loginData)
#     return jsonify(loginList)


@app.route('/dashboard', methods=['POST'])
def post_dashboard():
    """posts data from dashboard form"""
    dashboardData = request.get_json()


@app.route("/login", methods=["POST", "GET"])
def login():
    tokenData = request.get_json()
    print(tokenData)
    tokenDict = tokenData['loginValues']
    email = tokenDict['email']
    password = tokenDict['password']
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)
    


if __name__ == "__main__":
    app.run(debug=True)
