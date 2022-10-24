"connect to db using sqlalchemy"""
from os import getenv
from back_end.base_model import Base
from back_end.sales import Sales
from back_end.product import Product
from back_end.user import User
from sqlalchemy import create_engine, delete, update
from sqlalchemy.orm import scoped_session, sessionmaker


USER = getenv('USER')
PWD = getenv('PWD')
HOST = 'localhost'
DB = 'stock_inventory'
engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                       format(USER, PWD, HOST, DB))
Base.metadata.create_all(engine)
sess_factory = sessionmaker(bind=engine, expire_on_commit=False)
session = scoped_session(sess_factory)