# -- coding: utf-8 --
# !/usr/bin/env python
# coding=utf-8
# @Time    : 2023/8/25 11:08
# @Author  : Oran Wu
# @File    : __init__.py
# @Software: PyCharm
from .admin_view import admin_api
from .game_scratch_view import scratch_api
from .index_view import index_api
from .test_view import test_api

route_list = [admin_api, scratch_api, index_api, test_api]
