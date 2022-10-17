#!/usr/bin/python3
"""Class DBStorage"""
import models
from models.base_model import BaseModel, Base
from models.order import Order
from models.order_detail import OrderDetail
from models.product import Product
from models.user import User
from os import getenv
import sqlalchemy
from sqlalchemy import create_engine, delete, update
from sqlalchemy.orm import scoped_session, sessionmaker


classes = {"Product": Product, "User": User,
           "Order": Order, "OrderDetail": OrderDetail}


class DBStorage:
    """Interacts with MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Connecting to the database"""
        USER = getenv('USER')
        PWD = getenv('PWD')
        HOST = 'localhost'
        DB = 'stock_inventory'
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(USER, PWD, HOST, DB))

    def all(self, cls=None):
        """query on the current database session"""
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return new_dict

    def new(self, obj):
        """add a new object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, model, id_obj):
        """delete obj from the current database session"""
        self.__session.query(model).filter(model.id == id_obj).delete()
        self.__session.commit()

    def update(self, model, id_obj, key, value):
        """update obj in the database with the given id, key and value"""
        self.__session.query(model).filter(model.id == id_obj).\
            update({key: value})
        self.__session.commit()

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()

    def get(self, cls, id):
        """
        Returns the object based on the class name and its ID, or
        None if not found
        """
        if cls not in classes.values():
            return None
        all_cls = models.storage.all(cls)
        for value in all_cls.values():
            if (value.id == id):
                return value
        return None

    def count(self, cls=None):
        """Return the number of objects in storage"""
        all_class = classes.values()
        if not cls:
            count = 0
            for clas in all_class:
                count += len(models.storage.all(clas).values())
        else:
            count = len(models.storage.all(cls).values())
        return count
