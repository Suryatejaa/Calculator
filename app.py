from flask import Flask, request, jsonify, render_template
import firebase_admin
from firebase_admin import credentials, db

app = Flask(__name__)

cred = credentials.Certificate("path/to/your/serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://calculator-surya-default-rtdb.firebaseio.com/'
})

set_code = "22-08-2001"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/set_target', methods=['POST'])
def set_target():
    ref = db.reference("List/Targets")
    ref.set({
        "name": "niel",
        "state": "alive"
    })
    return jsonify({"status": "success"})

@app.route('/calculate', methods=['POST'])
def calculate():
    input_value = request.json['inputValue']
    
    if input_value == set_code:
        return jsonify({"action": "admin"})
    
    ref = db.reference('messages/{}'.format(input_value))
    snapshot = ref.get()

    if snapshot:
        return jsonify({"result": snapshot})
    
    try:
        expression = input_value.replace('%', '*0.01*')
        result = eval(expression)
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"result": "Error"})

@app.route('/admin_set_message', methods=['POST'])
def admin_set_message():
    data = request.json
    birthday = data.get('birthday')
    message = data.get('message')

    if birthday and message:
        ref = db.reference('messages/{}'.format(birthday))
        ref.set(message)
        return jsonify({"status": "success"})
    return jsonify({"status": "error", "message": "Enter Date of Birth and Message too"})

@app.route('/view_message', methods=['POST'])
def view_message():
    birthday = request.json['birthday']
    ref = db.reference('messages/{}'.format(birthday))
    snapshot = ref.get()

    if snapshot:
        return jsonify({"message": snapshot})
    return jsonify({"message": "Hey Buddy, No message set for you..."})

if __name__ == '__main__':
    app.run(debug=True)
