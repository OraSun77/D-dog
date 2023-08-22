# -- coding: utf-8 --
# !/usr/bin/env python
# coding=utf-8
# @Time    : 2023/8/22 10:32
# @Author  : Oran Wu
# @File    : json_method
# @Software: PyCharm
import json

from flask import jsonify


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


def recharge_amount(path_, amount):
    json_data = read_local_json(path_)
    chance = json_data['information']['chance']
    json_data['information']['chance'] = chance + int(amount)
    with open(path_, 'w', encoding='gbk') as f:
        json.dump(json_data, f, ensure_ascii=False)


def history_in_json(path_, data):
    json_data = read_local_json(path_)
    name = list(data.keys())[0]
    date_now = data[name]['date']
    value = data[name]['value']
    if name in json_data.keys():
        json_data[name].update({date_now: value})
    else:
        json_data[name] = {date_now: value}
    with open(path_, 'w', encoding='gbk') as f:
        json.dump(json_data, f, ensure_ascii=False)


def clear_history(path_):
    json_data = {}
    with open(path_, 'w', encoding='gbk') as f:
        json.dump(json_data, f, ensure_ascii=False)


def choose_history_json(path_):
    json_data = read_local_json(path_)
    response = jsonify(json_data)
    response.headers["Content-Type"] = "application/json;charset=UTF-8"
    return response
