# -- coding: utf-8 --
# !/usr/bin/env python
# coding=utf-8
# @Time    : 2023/8/25 11:12
# @Author  : Oran Wu
# @File    : birthday_scratch_view
# @Software: PyCharm
from flask import Blueprint, render_template

from apps.api.method import json_method

scratch_api = Blueprint('scratch_api', __name__)


@scratch_api.route('/scratch')
def my_html_mobile():
    json_data = json_method.read_local_json('records/probability.json')
    json_method.read_and_modify_json_chance('records/probability.json')
    return render_template('game/scratch/mobile_scratch.html', combine_list=json_data)


@scratch_api.route('/birthday_card')
def birthday_card():
    return render_template('game/scratch/birthday.html')
