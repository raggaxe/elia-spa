import os
from flask_socketio import *
from app import app as application
app = application

if __name__ == '__main__':
    socketio.run(app, port=os.getenv('PORT'), debug=True)

