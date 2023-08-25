# -- coding: utf-8 --
# !/usr/bin/env python
# coding=utf-8
# @Time    : 2023/8/25 11:11
# @Author  : Oran Wu
# @File    : admin_view
# @Software: PyCharm


from flask import Blueprint, render_template, request, redirect, url_for

from method import json_method

admin_api = Blueprint('admin_api', __name__)


@admin_api.route('/admin', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    if username == 'admin' and password == '123':
        chance = json_method.read_local_json('config/probability.json')['information']['chance']
        return render_template('recharge.html', chance=chance, username=username, message='')
        # return redirect(url_for('dx_present', next=request.url))
    else:
        return render_template('login.html', message='Please write in correct username and password! ')


@admin_api.route('/login')
def home():
    return render_template('login.html', message='')


@admin_api.route('/recharge', methods=['POST'])
def recharge():
    amount = request.form['recharge amount']
    if not amount:
        amount = 0
    json_method.recharge_amount('config/probability.json', amount)
    json_data = json_method.read_local_json('config/probability.json')['information']
    chance = json_data['chance']
    username = json_data['name']
    return render_template('recharge.html', chance=chance, username=username, message=f'{amount}金币已入账！')


@admin_api.route('/purchase_and_return', methods=['post', 'GET'])
def purchase_and_return():
    purchase = int(request.args['purchase'])
    json_method.recharge_amount('config/probability.json', purchase)
    return redirect(url_for('dx_present', next=request.url))
