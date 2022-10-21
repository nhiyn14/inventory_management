#!/usr/bin/python3
"""
API back-end
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
from back_end import session, User, Sales, Product
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
newList = []
updateList = []
deleteList = []


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


@app.route('/login', methods=['GET'])
def get_login():
    """gets login information"""
    return jsonify(loginList)


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


@app.route('/registration', methods=['GET'])
def get_registration():
    """gets registration information"""
    return jsonify(regList)


@app.route('/dashboard', methods=['GET'])
def get_dashboard():
    """posts data from dashboard form"""
    dashboardList.clear()
    # user_id just for testing purpose
    user_id = 'fdc9aaa3-c55f-413f-b81f-39199690e236'
    for each in session.query(Product).where(Product.user_id == user_id):
        product = each.__dict__
        if "_sa_instance_state" in product:
            del product["_sa_instance_state"]
        dashboardList.append(product)
    return json.dumps(dashboardList, indent=4, default=str)


@app.route('/newproduct', methods=['POST'])
def post_new_product():
    """create a new product in db"""
    newData = request.get_json()
    newValues = newData['newValues']
    newList.clear()
    newList.append(newValues)

    # user_id just for testing purpose
    user_id = 'fdc9aaa3-c55f-413f-b81f-39199690e236'
    product_name = newValues['product_name']
    price_wholesale = newValues['price_wholesale']
    price_retail = newValues['price_retail']
    product_description = newValues['product_description']
    quantity = newValues['quantity']
    # update the product_status
    if int(quantity) >= 10:
        product_status = "In Stock"
    elif int(quantity) > 0:
        product_status = "Low Stock"
    else:
        product_status = "No Stock"
    # check if the product wanted to create exist
    existedProduct = session.execute(select(Product).where(
                                        (Product.user_id == user_id) &
                                        (Product.product_name == product_name)
                                     )).fetchone()
    if existedProduct is not None:
        return {"msg": "Product is already existed"}, 409
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
    return jsonify(newList)


@app.route('/updateproduct/<product_name>', methods=['PUT'])
def update_product(product_name):
    """update information of an existing product"""
    updateData = request.get_json()
    updateValues = updateData['updateValues']
    updateList.clear()
    updateList.append(updateValues)

    # user_id just for testing purpose
    user_id = 'fdc9aaa3-c55f-413f-b81f-39199690e236'
    product_name = updateValues['product_name']
    # check if the product wanted to update exist
    existedProduct = session.execute(select(Product).where(
                                        (Product.user_id == user_id) &
                                        (Product.product_name == product_name)
                                     )).fetchone()
    if existedProduct is None:
        return {"msg": "Product not found"}, 409
    else:
        # check keys that need to be update AND update it
        product = session.query(Product).filter(
                                          Product.user_id == user_id,
                                          Product.product_name == product_name
                                          )
        if 'price_wholesale' in str(updateList):
            product \
                .update({"price_wholesale": updateValues['price_wholesale']})
        if 'price_retail' in str(updateList):
            product.update({"price_retail": updateValues['price_retail']})
        if 'product_description' in str(updateList):
            product_description = updateValues['product_description']
            product.update({"product_description": product_description})
        if 'quantity' in str(updateList):
            product.update({"quantity": updateValues['quantity']})
            if int(updateValues['quantity']) >= 10:
                product_status = "In Stock"
            elif int(updateValues['quantity']) > 0:
                product_status = "Low Stock"
            else:
                product_status = "No Stock"
            product.update({"product_status": product_status})
        if 'new_prod_name' in str(updateList):
            product.update({"product_name": updateValues['new_prod_name']})
        session.commit()
    return jsonify(updateList)


@app.route('/deleteproduct/<product_name>', methods=['DELETE'])
def delete_product(product_name):
    """delete an existing product"""
    deleteValues = {"product_name": product_name}
    deleteList.clear()
    deleteList.append(deleteValues)

    # user_id just for testing purpose
    user_id = 'fdc9aaa3-c55f-413f-b81f-39199690e234'
    # check if the product wanted to delete exist
    existedProduct = session.execute(select(Product).where(
                                        (Product.user_id == user_id) &
                                        (Product.product_name == product_name)
                                     )).fetchone()
    if existedProduct is None:
        return {"msg": "Product not found"}, 409

    # check if the product is linked to any sales
    product_id = existedProduct[0].id
    existedSales = session.execute(select(Sales).where(
                                        (Sales.product_id == product_id)
                                     )).fetchone()
    if existedSales is not None:
        return {"msg": "Unsuccessfully deleted Product. \
                Product is linked to past sales."}, 403
    # delete the product
    session.query(Product).filter(
                                  Product.user_id == user_id,
                                  Product.product_name == product_name
                                  ).delete()
    session.commit()
    return jsonify(deleteList)


@app.route('/newsales', methods=['POST'])
def post_new_sales():
    """create a new sales in db"""
    newData = request.get_json()
    newValues = newData['newValues']

    # user_id just for testing purpose
    user_id = 'fdc9aaa3-c55f-413f-b81f-39199690e234'
    product_name = newValues['product_name']
    quantity = newValues['quantity']

    existedProduct = session.execute(select(Product).where(
                                        (Product.user_id == user_id) &
                                        (Product.product_name == product_name)
                                     )).fetchone()
    # check if the product wanted to sale exist
    if existedProduct is None:
        return {"msg": "Product not found"}, 409
    # check if the quanity wanted to sale enough
    if int(existedProduct[0].quantity) < int(quantity):
        return {"msg": "Not enough stock for this sales"}, 409
    else:
        new_quantity = int(existedProduct[0].quantity) - int(quantity)
        # update the product_status
        if new_quantity >= 10:
            product_status = "In Stock"
        elif new_quantity > 0:
            product_status = "Low Stock"
        else:
            product_status = "No Stock"
        session.query(Product).filter(
                                      Product.user_id == user_id,
                                      Product.product_name == product_name
                                      ) \
            .update({"product_status": product_status,
                     "quantity": new_quantity})
    # get all required values ready
    product_id = existedProduct[0].id
    sale_price = existedProduct[0].price_retail
    price_wholesale = existedProduct[0].price_wholesale
    revenue = float(sale_price) * int(quantity)
    profit = (float(sale_price) - float(price_wholesale)) * int(quantity)
    # add new sales
    newSales = Sales(user_id=user_id, product_id=product_id,
                     sale_price=sale_price, quantity=quantity,
                     revenue=revenue, profit=profit)
    session.add(newSales)
    session.commit()

    # get list ready to return
    newList.clear()
    newList.append(newSales.__dict__)
    return {"msg": "Successfully created sales"}, 200


@app.route('/newsales', methods=['GET'])
def get_new_sales():
    """return information of the new sales"""
    return json.dumps(newList, indent=4, default=str)


if __name__ == "__main__":
    app.run(debug=True)
