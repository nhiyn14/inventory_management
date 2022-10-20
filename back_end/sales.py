#!/usr/bin/python3
"""Class Sales"""
from os import getenv
from back_end.base_model import BaseModel, Base
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float
from sqlalchemy import ForeignKey, DateTime
from sqlalchemy.orm import relationship


class Sales(BaseModel, Base):
    """class def for an orders detail by each product ordered"""
    __tablename__ = 'sales'
    product_id = Column(String(60),
                        ForeignKey('product.id'),
                        nullable=False)
    sale_price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)
    revenue = Column(Float, nullable=False)
    profit = Column(Float, nullable=False)

    def __init__(self, *args, **kwargs):
        """initializes OrderDetail"""
        super().__init__(*args, **kwargs)