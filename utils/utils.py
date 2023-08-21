# -- coding: utf-8 --
# !/usr/bin/env python
# coding=utf-8
# @Time    : 2023/8/18 17:48
# @Author  : Oran Wu
# @File    : utils
# @Software: PyCharm
import json


def read_local_json(path_):
    with open(path_, "r", encoding='gbk') as f:
        json_data = json.load(f)
        return json_data


def read_and_modify_json_chance(path_):
    json_data = read_local_json(path_)
    chance = json_data['information']['chance']
    new_chance = chance - 10
    if new_chance >= 0:
        json_data['information']['chance'] = new_chance
        with open(path_, 'w', encoding='gbk') as f:
            json.dump(json_data, f, ensure_ascii=False)
