#!/usr/bin/python3
"""Class Order"""
from os import getenv
import models
from models.base_model import BaseModel, Base
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float
from sqlalchemy import ForeignKey, DateTime
from sqlalchemy.orm import relationship


class Order(BaseModel, Base):
    """class def for an order"""
    __tablename__ = 'order'
    user_id = Column(String(60), ForeignKey('user.id'), nullable=False)
    """customer_id = Column(Integer, nullable=True)"""
    discount = Column(Float, default=0, nullable=True)
    """ is this an order discount, applied to all products? YES"""

    def __init__(self, *args, **kwargs):
        """initializes Order"""
        super().__init__(*args, **kwargs)