#!/usr/bin/python3
"""This module defines our classes for all models """

from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

Base = declarative_base()

class Product(Base):
    """ class def for a product """
    __tablename__ = 'product'
    product_id = Column(Integer, nullable=False, primary_key=True, unique=True)
    """ this needs to be auto-generated """
    product_name = Column(String(40), nullable=False)
"""    type_id = Column(Integer, ForeignKey('type.id'), nullable=True)
    category_id = Column(Integer, ForeignKey('category.cat_id', nullable=True)) """
    seller_id = Column(Integer, ForeignKey('user.user_id', nullable=False)
    """ needs to default to current user """
    create_time = Column(Datetime, default=datetime.utcnow(), nullable=False)
    price_wholesale = Column(Float)
    price_retail = Column(Float)
    product_description = Column(String(100))
    quantity = Column(Integer)
    product_status = Column(String(40))

class User(Base):
    """ class definition for a user """
    __tablename__ = 'user'
    user_id = Column(Integer, primary_key=True, unique=True)
    """ needs to be auto-generated """
    username = Column(String(20), nullable=False, unique=True)
    first_name = Column(String(128), nullable=True)
    last_name = Column(String(128), nullable=True)
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    
class Order(Base):
    """ class def for an order """
    __tablename__ = 'order'
    order_id = Column(Integer, primary_key=True, unique=True, nullable=False)
    """ auto-generate? """
    order_date = Column(Datetime, default=datetime.utcnow(), nullable=False)
    seller_id = Column(Integer, ForeignKey('User.user_id'), nullable=False)
    customer_id = Column(Integer, nullable=True)
    """ what is this? """
    discount = Column(Float, default=0, nullable=True)
    """ is this an order discount, applied to all products? """

    
class Order_Detail(Base):
    """ class def for an orders detail by product ordered """
    __tablename__ = 'order_detail'
    order_detail_id = Column(Integer, primary_key=True, unique=True, nullable=False)
    order_id = Column(Integer, ForeignKey('order.order_id'), nullable=False)
    product_id = Column(Integer, ForeignKey('product.product_id'), nullable=False)
    product_price = Column(Float, ForeignKey('product.price_wholesale'), nullable=False)
    """ can we store this again ? how ? do we need to ? """
    product_discount = Column(Float, nullable=False, default=0)
    """ is this different to the discount in order ? can be auto-generated """
    sale_price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)
    revenue = Column(Float, nullable=False)
    """ auto-generate """
    gross_profit = Column(Float, nullable=False)
    """ autogenerate gp = qty*(sale_price - wholesale_price) """





    
