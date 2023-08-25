# -- coding: utf-8 --
# !/usr/bin/env python
# coding=utf-8
# @Time    : 2023/8/25 11:12
# @Author  : Oran Wu
# @File    : index_view
# @Software: PyCharm
from flask import Blueprint, render_template, request

from method import json_method

index_api = Blueprint('index_api', __name__)


@index_api.route('/828')
def dx_present():
    json_data = json_method.read_local_json('config/probability.json')
    chance = json_data['information']['chance']
    return render_template('index.html', combine_list=chance)


@index_api.route('/write_in_history', methods=['POST'])
def write_in_history():
    data = request.json
    json_method.history_in_json(path_='config/history.json', data=data)
    # 在这里处理接收到的数据
    # 例如，你可以访问data['param1']和data['param2']
    return '数据已接收'  # 返回一个响应给前端


@index_api.route('/clear_history')
def clean_the_history():
    json_method.clear_history(path_='config/history.json')
    return {'message': '数据已清理'}


@index_api.route('/push_history')
def push_history():
    return json_method.choose_history_json(path_='config/history.json')
