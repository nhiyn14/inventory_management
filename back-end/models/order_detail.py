#!/usr/bin/python3
"""Class OrderDetail"""
from os import getenv
import models
from models.base_model import BaseModel, Base
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float
from sqlalchemy import ForeignKey, DateTime
from sqlalchemy.orm import relationship


class OrderDetail(BaseModel, Base):
    """class def for an orders detail by each product ordered"""
    __tablename__ = 'order_detail'
    order_id = Column(String(60),
                      ForeignKey('order.id'),
                      nullable=False)
    product_id = Column(String(60),
                        ForeignKey('product.id'),
                        nullable=False)
    product_discount = Column(Float, nullable=False, default=0)
    sale_price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)
    revenue = Column(Float, nullable=False)
    gross_profit = Column(Float, nullable=False)

    def __init__(self, *args, **kwargs):
        """initializes OrderDetail"""
        super().__init__(*args, **kwargs)
