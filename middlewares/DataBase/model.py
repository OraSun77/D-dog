# -- coding: utf-8 --
# !/usr/bin/env python
# coding=utf-8
# @Time    : 2023/9/5 14:18
# @Author  : Oran Wu
# @File    : model
# @Software: PyCharm
from datetime import datetime

import orm
import databases
import pymssql
from flask_sqlalchemy import SQLAlchemy

from middlewares.DataBase.base import *


def add_db(source):
    db_url = f'mssql+pymssql://{user}:{pwd}@{host}:{port}/{db_name}'
    source.config['SQLALCHEMY_DATABASE_URI'] = db_url
    db = SQLAlchemy(source)

    class Menstruation(db.Model):
        __tablename__ = 'menstruation_data'  # 设置表名
        Id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # 设置其他字段
        From = db.Column(db.DateTime)
        To = db.Column(db.DateTime, default=datetime.utcnow)

    with source.app_context():
        db.create_all()
