# -- coding: utf-8 --
# !/usr/bin/env python
# coding=utf-8
# @Time    : 2023/8/18 17:48
# @Author  : Oran Wu
# @File    : utils
# @Software: PyCharm
import json


def read_local_json(path_):
    with open(path_, "r", encoding="utf-8") as f:
        json_data = json.load(f)
        return json_data
