# -- coding: utf-8 --
# !/usr/bin/env python
# coding=utf-8
# @Time    : 2023/8/29 10:51
# @Author  : Oran Wu
# @File    : game_transcending_time_view
# @Software: PyCharm
from flask import Blueprint, render_template, request, redirect, url_for

from method import json_method

transcending_api = Blueprint('transcending_api', __name__)


@transcending_api.route('/choose_level')
def choose_level():
    level = int(request.args['level'])
    map_ = {
        1: {'name': '平凡', 'person_num': 2000, 'ticket_num': 100},
        2: {'name': '流行', 'person_num': 7000, 'ticket_num': 300},
        3: {'name': '热门', 'person_num': 12000, 'ticket_num': 500},
        4: {'name': '风靡', 'person_num': 25000, 'ticket_num': 800},
        5: {'name': '狂热', 'person_num': 50000, 'ticket_num': 1250},
    }
    return render_template('game/transcending time/transcending_time.html',
                           name=map_[level]['name'],
                           person_num=map_[level]['person_num'],
                           ticket_num=map_[level]['ticket_num'])
