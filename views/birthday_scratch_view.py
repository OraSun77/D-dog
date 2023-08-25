# -- coding: utf-8 --
# !/usr/bin/env python
# coding=utf-8
# @Time    : 2023/8/25 11:12
# @Author  : Oran Wu
# @File    : birthday_scratch_view
# @Software: PyCharm
from flask import Blueprint, render_template

from method import json_method

scratch_api = Blueprint('scratch_api', __name__)


@scratch_api.route('/mobile')
def my_html_mobile():
    json_data = json_method.read_local_json('config/probability.json')
    json_method.read_and_modify_json_chance('config/probability.json')
    return render_template('mobile_scratch.html', combine_list=json_data)


@scratch_api.route('/birthday_card')
def birthday_card():
    return render_template('birthday.html')
