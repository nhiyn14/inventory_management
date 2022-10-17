#!/usr/bin/python3
"""Class User"""
from os import getenv
import models
from models.base_model import BaseModel, Base
from datetime import datetime
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
    """class def for a user"""
    __tablename__ = 'user'
    username = Column(String(20), nullable=False, unique=True)
    first_name = Column(String(128), nullable=False)
    last_name = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)

    def __init__(self, *args, **kwargs):
        """initializes User"""
        super().__init__(*args, **kwargs)
