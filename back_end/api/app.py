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
reportList = []


@app.route('/login', methods=['POST'])
def create_token():
    """gets login information"""
    loginData = request.get_json()
    loginValues = loginData
    loginList.clear()
    loginList.append(loginValues)
    email = loginValues['email']
    password = loginValues['password']
    hashedPassword = hashlib.md5(password.encode()).hexdigest()
    # check if this user exist
    user = session.execute(select(User).where(User.email == email)).fetchone()
    if user is None or user[0].email != email:
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
    regValues = request.get_json()
    regList.clear()
    regList.append(regValues)

    first_name = regValues['firstName']
    last_name = regValues['lastName']
    email = regValues['email']
    password = regValues['password']
    hashedPassword = hashlib.md5(password.encode()).hexdigest()
    # check if the given email already used by another user
    existedUser = session.execute(select(User).where(User.email == email)
                                  ).fetchone()
    if existedUser is not None:
        return {"msg": "This email is already used"}, 409
    else:
        # regist new user
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
@jwt_required()
def get_dashboard():
    """posts data from dashboard form"""
    dashboardList.clear()
    # retrieve current user_id
    user_id = get_jwt_identity()
    for each in session.query(Product).where(Product.user_id == user_id):
        product = each.__dict__
        if "_sa_instance_state" in product:
            del product["_sa_instance_state"]
        dashboardList.append(product)
    return json.dumps(dashboardList, indent=4, default=str)


@app.route('/newproduct', methods=['POST'])
@jwt_required()
def post_new_product():
    """create a new product in db"""
    newValues = request.get_json()
    newList.clear()
    newList.append(newValues)

    # retrieve current user_id
    user_id = get_jwt_identity()
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


@app.route('/updateproduct', methods=['POST'])
@jwt_required()
def post_updateproduct():
    """update information of an existing product"""
    updateValues = request.get_json()
    updateList.clear()
    updateList.append(updateValues)

    product_name = updateValues['product_name']
    # retrieve current user_id
    user_id = get_jwt_identity()

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
            session.query(Product).filter(
                Product.user_id == user_id,
                Product.product_name == product_name
            ) \
                .update({"product_name": updateValues['new_prod_name']})
        session.commit()
    return {"msg": "Successfully updated product"}, 200


@app.route('/updateproduct', methods=['GET'])
def get_updateproduct():
    """get the update information of an existing product"""
    return jsonify(updateList)


@app.route('/deleteproduct', methods=['POST'])
@jwt_required()
def post_delete_product():
    """delete an existing product"""
    deleteData = request.get_json()
    deleteList.clear()
    deleteList.append(deleteData)

    product_name = deleteData['product_name']
    # retrieve current user_id
    user_id = get_jwt_identity()

    existedProduct = session.execute(select(Product).where(
        (Product.user_id == user_id) &
        (Product.product_name == product_name)
    )).fetchone()
    if existedProduct is None:
        return {"msg": "Product not found"}, 409
    product_id = existedProduct[0].id
    existedSales = session.execute(select(Sales).where(
        (Sales.product_id == product_id)
    )).fetchone()
    if existedSales is not None:
        return {"msg": "Unsuccessfully deleted Product. \
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


@app.route('/newsales', methods=['POST'])
@jwt_required()
def post_new_sales():
    """create a new sales in db"""
    newSaleValues = request.get_json()
    product_name = newSaleValues['salesName']
    quantity = newSaleValues['totalSales']
    # retrieve current user_id
    user_id = get_jwt_identity()

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


@app.route('/report1', methods=['GET'])
@jwt_required()
def post_report_1():
    """return sold quantity + profit per product per month"""
    reportList.clear()
    # retrieve current user_id
    user_id = get_jwt_identity()
    # retrieve all products belong to the user
    all_product = session.query(Product).where(Product.user_id == user_id)
    for each in all_product:
        # retrieve name of the product
        product_name = each.product_name
        product_id = each.id
        sold_quantity = 0
        total_profit = 0
        # retrieve all sales of the same products
        all_sales = session.query(Sales).where(
            (Sales.user_id == user_id) &
            (Sales.product_id == product_id))
        # calculate sold_quantity and total_profit of the product
        for each in all_sales:
            sold_quantity = sold_quantity + each.quantity
            total_profit = total_profit + each.profit
        # create a new dict for each product
        product = {"product_name": product_name,
                    "sold_quantity": sold_quantity,
                    "total_profit": total_profit}
        reportList.append(product)
    return (reportList)


if __name__ == "__main__":
    app.run(debug=True)
