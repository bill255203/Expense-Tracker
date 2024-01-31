from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)
def db_connection():
    conn = sqlite3.connect('expenses.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/users', methods=['GET', 'POST'])
def users():
    conn = db_connection()
    cursor = conn.cursor()

    if request.method == 'GET':
        cursor = conn.execute("SELECT * FROM user")
        users = [dict(row) for row in cursor.fetchall()]
        return jsonify(users)

    if request.method == 'POST':
        new_name = request.form['name']
        cursor.execute("SELECT * FROM user WHERE name = ?", (new_name,))
        existing_user = cursor.fetchone()
        if existing_user is None:
            cursor.execute("INSERT INTO user (name) VALUES (?)", (new_name,))
            conn.commit()
            return jsonify({"id": cursor.lastrowid, "name": new_name}), 201
        else:
            # User already exists, return existing user data
            return jsonify(dict(existing_user)), 200

@app.route('/expenses', methods=['GET', 'POST'])
def expenses():
    conn = db_connection()
    cursor = conn.cursor()

    if request.method == 'GET':
        cursor = conn.execute("SELECT * FROM expense")
        expenses = [dict(row) for row in cursor.fetchall()]
        return jsonify(expenses)

    if request.method == 'POST':
        new_expense = (
            request.form['paid_by'],
            request.form['owed_by'],
            request.form['amount'],
        )
        cursor.execute("INSERT INTO expense (paid_by, owed_by, amount) VALUES (?, ?, ?)", new_expense)
        conn.commit()
        return jsonify({"id": cursor.lastrowid}), 201

@app.route('/')
def index():
    return "Expense Tracker API"

def init_sqlite_db():
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS expense (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            paid_by TEXT NOT NULL,
            owed_by TEXT NOT NULL,
            amount REAL NOT NULL
        )
    """)
    conn.commit()

if __name__ == '__main__':
    init_sqlite_db()
    app.run(debug=True)
