from app import app, socketio

if __name__ == '__main__':
    """ Run the app. """
    socketio.run(app)
