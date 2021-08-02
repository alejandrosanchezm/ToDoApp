from app import app, controller as c
from flask import render_template, request
import json

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/board/<board_name>')
def board(board_name):
    data = c.load_board_data(board_name)
    return render_template("board_template.html", board = data)

@app.route('/store', methods=["POST"])
def store():
    if 'data' in request.form:
        data = json.loads(request.form['data'])
        print(data)
        c.save_board_data(data,"test")
    return "OK"