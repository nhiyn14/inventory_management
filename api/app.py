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
from sqlalchemy import select, delete

app = Flask(__name__)
app.url_map.strict_slashes = False
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
jwt = JWTManager(app)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
corsInstance = CORS(app, resources={r"/*": {"origins": "*"}})

loginList = []
regList = []
dashboardList = []
prodList = []
updateList = []
deleteList = []


@app.route('/login', methods=['GET'])
def get_login():
    """gets login information"""
    return jsonify(loginList)


@app.route('/login', methods=['POST'])
def create_token():
    """gets registration information"""
    loginData = request.get_json()
    loginValues = loginData['loginValues']
    loginList.clear()
    loginList.append(loginValues)

    email = loginValues['email']
    password = loginValues['password']
    hashedPassword = hashlib.md5(password.encode()).hexdigest()
    print(hashedPassword)

    user = session.execute(select(User).where(User.email == email)).fetchone()
    if user[0].email is None or user[0].email != email:
        return {"msg": "Incorrect email"}, 400
    else:
        if user[0].password != hashedPassword:
            return {"msg": "Incorrect password"}, 400
        else:
            access_token = create_access_token(identity=user[0].id)
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
    regList.clear()
    regList.append(regValues)

    first_name = regValues['first_name']
    last_name = regValues['last_name']
    email = regValues['email']
    password = regValues['password']
    hashedPassword = hashlib.md5(password.encode()).hexdigest()

    existedUser = session.execute(select(User).where(User.email == email)
                                  ).fetchone()
    if existedUser is not None:
        return {"msg": "This email is already used"}, 409
    else:
        newUser = User(first_name=first_name, last_name=last_name,
                       email=email, password=hashedPassword)
        session.add(newUser)
        session.commit()
    return {"msg": "New User Account created"}, 200


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


@app.route('/newproduct', methods=['POST'])
def post_new_product():
    """create a new product in db"""
    prodData = request.get_json()
    prodValues = prodData['prodValues']
    prodList.clear()
    prodList.append(prodValues)

    product_name = prodValues['product_name']
    # user_id just for testing purpose
    user_id = 'fdc9aaa3-c55f-413f-b81f-39199690e236'
    price_wholesale = prodValues['price_wholesale']
    price_retail = prodValues['price_retail']
    product_description = prodValues['product_description']
    quantity = prodValues['quantity']
    if int(quantity) >= 10:
        product_status = "In Stock"
    elif int(quantity) > 0:
        product_status = "Low Stock"
    else:
        product_status = "No Stock"

    existedProduct = session.execute(select(Product).where(
                                        (Product.user_id == user_id) &
                                        (Product.product_name == product_name)
                                     )).fetchone()
    if existedProduct is not None:
        return {"msg": "Product {product_name} is already existed"}, 409
    else:
        newProduct = Product(product_name=product_name, user_id=user_id,
                             price_wholesale=price_wholesale,
                             price_retail=price_retail, quantity=quantity,
                             product_description=product_description,
                             product_status=product_status)
        session.add(newProduct)
        session.commit()
    return {"msg": "Successfully created product"}, 200


@app.route('/newproduct', methods=['GET'])
def get_new_product():
    """get newly-created product information"""
    return jsonify(prodList)


@app.route('/updateproduct', methods=['POST'])
def post_updatep_roduct():
    """update information of an existing product"""
    updateData = request.get_json()
    updateValues = updateData['updateValues']
    updateList.clear()
    updateList.append(updateValues)

    product_name = updateValues['product_name']
    # user_id just for testing purpose
    user_id = 'fdc9aaa3-c55f-413f-b81f-39199690e236'

    existedProduct = session.execute(select(Product).where(
                                        (Product.user_id == user_id) &
                                        (Product.product_name == product_name)
                                     )).fetchone()
    if existedProduct is None:
        return {"msg": "Product not found"}, 409
    else:
        if 'price_wholesale' in str(updateList):
            session.query(Product).filter(
                                          Product.user_id == user_id,
                                          Product.product_name == product_name
                                          ) \
                .update({"price_wholesale": updateValues['price_wholesale']})
        if 'price_retail' in str(updateList):
            session.query(Product).filter(
                                          Product.user_id == user_id,
                                          Product.product_name == product_name
                                          ) \
                .update({"price_retail": updateValues['price_retail']})
        if 'product_description' in str(updateList):
            product_description = updateValues['product_description']
            session.query(Product).filter(
                                          Product.user_id == user_id,
                                          Product.product_name == product_name
                                          ) \
                .update({"product_description": product_description})
        if 'quantity' in str(updateList):
            session.query(Product).filter(
                                          Product.user_id == user_id,
                                          Product.product_name == product_name
                                          ) \
                .update({"quantity": updateValues['quantity']})
            if int(updateValues['quantity']) >= 10:
                quantity = "In Stock"
            elif int(updateValues['quantity']) > 0:
                quantity = "Low Stock"
            else:
                quantity = "No Stock"
            session.query(Product).filter(
                                          Product.user_id == user_id,
                                          Product.product_name == product_name
                                          ) \
                .update({"product_status": quantity})
        if 'new_prod_name' in str(updateList):
            print("it got here")
            session.query(Product).filter(
                                          Product.user_id == user_id,
                                          Product.product_name == product_name
                                          ) \
                .update({"product_name": updateValues['new_prod_name']})
        session.commit()
    return {"msg": "Successfully updated product"}, 200


@app.route('/updateproduct', methods=['GET'])
def get_update_product():
    """get the update information of an existing product"""
    return jsonify(updateList)


@app.route('/deleteproduct', methods=['POST'])
def post_delete_product():
    """delete an existing product"""
    deleteData = request.get_json()
    deleteValues = deleteData['deleteValues']
    deleteList.clear()
    deleteList.append(deleteValues)

    product_name = deleteValues['product_name']
    user_id = deleteValues['user_id']

    existedProduct = session.execute(select(Product).where(
                                        (Product.user_id == user_id) &
                                        (Product.product_name == product_name)
                                     )).fetchone()
    if existedProduct is None:
        return {"msg": "Product not found"}, 409
    product_id = existedProduct[0].id
    existedSales = session.execute(select(SalesDetail).where(
                                        (SalesDetail.product_id == product_id)
                                     )).fetchone()
    if existedSales is not None:
        return {"msg": "Unsuccessfully deleted Product.
                Product is linked to past sales."}, 403
    session.query(Product).filter(
                                  Product.user_id == user_id,
                                  Product.product_name == product_name
                                  ).delete()
    session.commit()
    return {"msg": "Successfully deleted product"}, 200


@app.route('/deleteproduct', methods=['GET'])
def get_delete_product():
    """delete an existing product"""
    return jsonify(deleteList)


@app.route('/product/<id>', methods=['POST'])
def get_specific_product():
    """get the information of the deleted product"""


@app.errorhandler(404)
def errorHandler(e):
    """404 error handling"""
    return jsonify(error='Not found'), 404


if __name__ == "__main__":
    app.run(debug=True)
