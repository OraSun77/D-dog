import os

from flask import Flask, render_template, request, redirect, url_for
from method import json_method, data_method

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False


@app.route('/')
def main_page():
    return 'hello everyoneeeeeeeeeeeeeee'


@app.route('/828')
def dx_present():
    json_data = json_method.read_local_json('config/probability.json')
    chance = json_data['information']['chance']
    return render_template('index.html', combine_list=chance)


@app.route('/test')
def test():
    return render_template('test.html')


@app.route('/mobile')
def my_html_mobile():
    json_data = json_method.read_local_json('config/probability.json')
    json_method.read_and_modify_json_chance('config/probability.json')
    return render_template('mobile_scratch.html', combine_list=json_data)


@app.route('/login')
def home():
    return render_template('login.html', message='')


@app.route('/mx')
def mx():
    return '不愧是马无言问号王强啊王qa缔造者绰号骁神早睡早起早上b站打卡上午詹姆斯马登中午鸡王下午徐庶技能沉默是金上班无敌魔芋爱好男蔡徐坤女Sainkho炉石传说法师爱好者、皮肤收集者、主爱奇迹法、360扎针牧成就拥有者，原神杜兰特、风男收集者、温迪、散兵、砂糖、琴无敌风之队、入坑神里凌华出坑原神任务、三国杀登录领英雄成就获得者、酒馆战旗速本第八大蛇内战血入队友者、食物语开服玩家最强食魂驴打滚拥有者赌boss无敌吃鸡痴迷玩家一打四大神雪地无敌狙王、骨灰级ikun以及常年被骗的马保国弟子馬驍'


@app.route('/admin', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    if username == 'admin' and password == '123':
        chance = json_method.read_local_json('config/probability.json')['information']['chance']
        return render_template('recharge.html', chance=chance, username=username, message='')
        # return redirect(url_for('dx_present', next=request.url))
    else:
        return render_template('login.html', message='Invalid credentials')


@app.route('/recharge', methods=['POST'])
def recharge():
    amount = request.form['recharge amount']
    json_method.recharge_amount('config/probability.json', amount)
    json_data = json_method.read_local_json('config/probability.json')['information']
    chance = json_data['chance']
    username = json_data['name']
    return render_template('recharge.html', chance=chance, username=username, message=f'{amount}金币已入账！')


@app.route('/purchase_and_return', methods=['post', 'GET'])
def purchase_and_return():
    purchase = int(request.args['purchase'])
    json_method.recharge_amount('config/probability.json', purchase)
    return redirect(url_for('dx_present', next=request.url))


@app.route('/birthday_card')
def birthday_card():
    return render_template('birthday.html')


@app.route('/write_in_history', methods=['POST'])
def write_in_history():
    data = request.json
    json_method.history_in_json(path_='config/history.json', data=data)
    # 在这里处理接收到的数据
    # 例如，你可以访问data['param1']和data['param2']
    return '数据已接收'  # 返回一个响应给前端


@app.route('/clear_history')
def clean_the_history():
    json_method.clear_history(path_='config/history.json')
    return '数据已清理'


@app.route('/push_history')
def push_history():
    return json_method.choose_history_json(path_='config/history.json')


if __name__ == '__main__':
    app.run(host='0.0.0.0')
