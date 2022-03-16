from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

from config import Config

conf = Config()

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = conf.DB_URL

db = SQLAlchemy(app)
ma = Marshmallow(app)

from models.todo import Todo
db.create_all()
db.session.commit()

from routes.Todo import TodoResource, TodosListResource
api = Api(app)
api.add_resource(TodosListResource, '/todos')
api.add_resource(TodoResource, '/todos/<int:id>')




