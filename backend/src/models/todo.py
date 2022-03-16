from app import db, ma

class Todo(db.Model):
    __tablename__ = "Todo"
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(500), nullable=False)
    done = db.Column(db.Boolean, default=False)

class TodoSchema(ma.Schema):
    class Meta:
        fields = ("id", "description", "done")
        model = Todo

todo_schema = TodoSchema()
todos_chema = TodoSchema(many=True)