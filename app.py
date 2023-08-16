import os

from flask import Flask, render_template

app = Flask(__name__)


@app.route('/tk')
def my_html():
    return render_template('index.html')


@app.route('/')
def hello_world():
    return 'hello dx'


if __name__ == '__main__':
    app.run(host='0.0.0.0')
