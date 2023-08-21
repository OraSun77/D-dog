import os

from flask import Flask, render_template, request
from utils import utils

app = Flask(__name__)


@app.route('/828')
def dx_present():
    json_data = utils.read_local_json('config/probability.json')
    chance = json_data['information']['chance']
    return render_template('index.html', combine_list=chance)


@app.route('/mobile')
def my_html_mobile():
    json_data = utils.read_local_json('config/probability.json')
    mark = utils.read_and_modify_json_chance('config/probability.json')
    return render_template('mobile_scratch.html', combine_list=json_data, mark=mark)


@app.route('/')
def hello_world():
    return 'hello'


@app.route('/test')
def mx():
    return '不愧是马无言问号王强啊王qa缔造者绰号骁神早睡早起早上b站打卡上午詹姆斯马登中午鸡王下午徐庶技能沉默是金上班无敌魔芋爱好男蔡徐坤女Sainkho炉石传说法师爱好者、皮肤收集者、主爱奇迹法、360扎针牧成就拥有者，原神杜兰特、风男收集者、温迪、散兵、砂糖、琴无敌风之队、入坑神里凌华出坑原神任务、三国杀登录领英雄成就获得者、酒馆战旗速本第八大蛇内战血入队友者、食物语开服玩家最强食魂驴打滚拥有者赌boss无敌吃鸡痴迷玩家一打四大神雪地无敌狙王、骨灰级ikun以及常年被骗的马保国弟子馬驍'


@app.route('/music')
def music():
    return render_template('test.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0')
