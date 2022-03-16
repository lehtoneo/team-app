from flask import Flask, request
from flask_restful import Resource
from sqlalchemy import Integer
from app import db

from models.todo import Todo, todo_schema, todos_chema


    
class TodosListResource(Resource):

    def get(self):
        todos = Todo.query.all()
        return todos_chema.dump(todos)

    def post(self):
        new_todo = Todo(
            description=request.json['description'],
        )
        db.session.add(new_todo)
        db.session.commit()
        return todo_schema.dump(new_todo)

class TodoResource(Resource):

    def get(self, id):
        todo = Todo.query.get_or_404(id)
        return todo_schema.dump(todo)

