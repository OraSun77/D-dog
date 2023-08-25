import os

from flask import Flask
from views.admin_view import admin_api
from views.birthday_scratch_view import scratch_api
from views.index_view import index_api
from views.test_view import test_api

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

app.register_blueprint(admin_api)
app.register_blueprint(index_api)
app.register_blueprint(scratch_api)
app.register_blueprint(test_api)


@app.route('/')
def main_page():
    return 'hello everyoneeeeeeeeeeeeeee'


if __name__ == '__main__':
    app.run(host='0.0.0.0')
