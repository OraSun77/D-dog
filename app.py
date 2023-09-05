from flask import Flask
from apps.api.views import route_list
from middlewares.DataBase.model import add_db
from utils.utils import *

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
add_db(source=app)
add_route(source=app, add_list=route_list)


@app.route('/')
def main_page():
    return 'hello everyoneeeeeeeeeeeeeee'


if __name__ == '__main__':
    app.run(host='0.0.0.0')
