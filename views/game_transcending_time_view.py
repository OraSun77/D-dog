# -- coding: utf-8 --
# !/usr/bin/env python
# coding=utf-8
# @Time    : 2023/8/29 10:51
# @Author  : Oran Wu
# @File    : game_transcending_time_view
# @Software: PyCharm
from flask import Blueprint, render_template

from method import json_method

transcending_api = Blueprint('transcending_api', __name__)


@transcending_api.route('/transcending')
def my_html_mobile():
    json_data = json_method.read_local_json('config/probability.json')
    json_method.read_and_modify_json_chance('config/probability.json')
    return render_template('game/transcending time/transcending_time.html', combine_list=json_data)
