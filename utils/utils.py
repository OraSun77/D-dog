# -- coding: utf-8 --
# !/usr/bin/env python
# coding=utf-8
# @Time    : 2023/8/18 17:48
# @Author  : Oran Wu
# @File    : utils
# @Software: PyCharm
def add_route(source, add_list):
    for _ in add_list:
        source.register_blueprint(_)
