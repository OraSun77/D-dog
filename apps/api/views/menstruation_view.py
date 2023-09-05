# -- coding: utf-8 --
# !/usr/bin/env python
# coding=utf-8
# @Time    : 2023/9/4 17:06
# @Author  : Oran Wu
# @File    : menstruation
# @Software: PyCharm
from flask import Blueprint, render_template

menstruation_api = Blueprint('menstruation_api', __name__)


@menstruation_api.route('/menstruation')
def menstruation_main_html():
    return render_template('menstruation/menstruation.html')