#!/usr/bin/python3
"""Class Product"""
from os import getenv
from back_end.base_model import BaseModel, Base
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float
from sqlalchemy import ForeignKey, DateTime
from sqlalchemy.orm import relationship


class Product(BaseModel, Base):
    """ class def for a product"""
    __tablename__ = 'product'
    product_name = Column(String(40), nullable=False)
    user_id = Column(String(60), ForeignKey('user.id'), nullable=False)
    price_wholesale = Column(Float, nullable=False)
    price_retail = Column(Float, nullable=False)
    product_description = Column(String(200))
    quantity = Column(Integer, nullable=False)
    product_status = Column(String(40))

    def __init__(self, *args, **kwargs):
        """initializes Product"""
        super().__init__(*args, **kwargs)
