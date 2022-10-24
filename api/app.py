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
from back_end import session, User, Sales, SalesDetail, Product
from sqlalchemy import select, insert

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
jwt = JWTManager(app)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
corsInstance = CORS(app, resources={r"/*": {"origins": "*"}})


regList = []
loginList = []
dashboardList = []


@app.route('/login', methods=['GET'])
def get_login():
    """gets login information"""
    return jsonify(loginList)


@app.route('/login', methods=['POST'])
def create_token():
    """gets registration information"""
    loginData = request.get_json()
    loginValues = loginData['loginValues']
    email = loginValues['email']
    password = loginValues['password']
    hashedPassword = hashlib.md5(password.encode()).hexdigest()
    print(hashedPassword)

    user = session.execute(select(User).where(User.email == email)).fetchone()
    if user[0].email is None or user[0].email != email:
        return {"msg": "Incorrect email"}, 401
    else:
        if user[0].password != hashedPassword:
            return {"msg": "Incorrect password"}, 401
        else:
            access_token = create_access_token(identity=email)
            response = {"access_token": access_token}
            return response


@app.route('/registration', methods=['GET'])
def get_registration():
    """gets registration information"""
    return jsonify(regList)


@app.route('/registration', methods=['POST'])
def post_registration():
    """gets registration information"""
    regData = request.get_json()
    regValues = regData['regValues']
    first_name = regValues['first_name']
    last_name = regValues['last_name']
    email = regValues['email']
    password = regValues['password']
    hashedPassword = hashlib.md5(password.encode()).hexdigest()
    existedUser = session.execute(select(User).where(User.email == email)).fetchone()
    if existedUser is not None:
        return {"msg": "This email is already used"}, 409
    else:
        newUser = User(first_name=first_name, last_name=last_name,
                        email= email, password = hashedPassword)
        session.add(newUser)
        session.commit()
    return "New User Account created"


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

@app.errorhandler(404)
def errorHandler(e):
    """404 error handling"""
    return jsonify(error='Not found'), 404

if __name__ == "__main__":
    app.run(debug=True)