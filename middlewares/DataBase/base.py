# -- coding: utf-8 --
# !/usr/bin/env python
# coding=utf-8
# @Time    : 2023/9/5 9:37
# @Author  : Oran Wu
# @File    : base
# @Software: PyCharm
import os
import pymssql
from configparser import ConfigParser

CONFIG_PATH = 'records/config.ini'

config = ConfigParser()
config.read(CONFIG_PATH)

engine = config["DATABASE"]["ENGINE"]
host = config["DATABASE"]["HOST"]
db_name = config["DATABASE"]["DBNAME"]
user = config["DATABASE"]["USER"]
pwd = config["DATABASE"]["PASSWORD"]
port = config["DATABASE"]["PORT"]


class DBModel:
    @classmethod
    def link_to_db(cls, database='master'):
        # 连接到 SQL Server 数据库
        conn = pymssql.connect(host=host,
                               port=port,
                               user=user,
                               password=pwd,
                               database=database,
                               charset='utf8')
        return conn

    @classmethod
    def close_connect(cls, cursor, conn):
        cursor.close()
        conn.close()

    @classmethod
    def create_database(cls, database_name=db_name):
        conn = cls.link_to_db()
        cursor = conn.cursor()
        conn.autocommit(True)
        sql = f"SELECT COUNT(*) FROM sys.databases WHERE name = '{database_name}'"
        cursor.execute(sql)
        count = cursor.fetchone()[0]
        if count == 0:
            sql = f"CREATE DATABASE {database_name}"
            cursor.execute(sql)
            print(f"数据库 {database_name} 创建成功！")
        else:
            print(f"数据库 {database_name} 已经存在！")
        conn.autocommit(False)
        cls.close_connect(cursor, conn)

    @classmethod
    def delete_database(cls, database_name=db_name):
        conn = cls.link_to_db()
        cursor = conn.cursor()
        conn.autocommit(True)
        sql = f"SELECT COUNT(*) FROM sys.databases WHERE name = '{database_name}'"
        cursor.execute(sql)
        count = cursor.fetchone()[0]
        if count:
            sql = f"DROP DATABASE {database_name}"
            cursor.execute(sql)
            print(f"数据库 {database_name} 删除成功！")
        else:
            print(f"数据库 {database_name} 不存在！")
        conn.autocommit(False)
        cls.close_connect(cursor, conn)


db = DBModel()
db.create_database()
# db.delete_database()
