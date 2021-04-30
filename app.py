import time
import os
from flask import Flask, render_template, redirect, url_for
from flask_dance.contrib.facebook import make_facebook_blueprint
from flask_socketio import *
from dotenv import load_dotenv
from datetime import datetime, timedelta
from dotenv import load_dotenv
from Controllers import (
    IndexRoutes,
    DefaultRoutes,
)

import humanfriendly

load_dotenv()
app = Flask(__name__)

# app settings
UPLOAD_FOLDER = "./static/uploads/"
ALLOWED_EXTENSIONS = {"txt", "pdf", "png", "jpg", "jpeg", "gif"}

load_dotenv()
FACEBOOK_OAUTH_CLIENT_ID = os.getenv("FACEBOOK_OAUTH_CLIENT_ID")
FACEBOOK_OAUTH_CLIENT_SECRET = os.getenv("FACEBOOK_OAUTH_CLIENT_SECRET")

app.secret_key = os.getenv("APP_SECRET_KEY")
app.config["SECRET_KEY"] = os.getenv("APP_SECRET_KEY")
app.config["SESSION_COOKIE_NAME"] = "google-login-session"
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=240)

if os.getenv("APP_SETTINGS") == "development":
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

facebookbp = make_facebook_blueprint(
    client_id=FACEBOOK_OAUTH_CLIENT_ID,
    client_secret=FACEBOOK_OAUTH_CLIENT_SECRET,
    scope="email",
)

app.register_blueprint(facebookbp, url_prefix="/login")

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.jinja_env.add_extension("jinja2.ext.do")

socketio = SocketIO(app, async_handlers=True)

blueprints = [
    IndexRoutes.mod,
]

for bp in blueprints:
    app.register_blueprint(bp)

app.errorhandler(400)(DefaultRoutes.errorhandler)
app.errorhandler(401)(DefaultRoutes.errorhandler)
app.errorhandler(403)(DefaultRoutes.errorhandler)
app.errorhandler(404)(DefaultRoutes.errorhandler)
app.errorhandler(500)(DefaultRoutes.errorhandler)


@app.context_processor
def my_utility_processor():

    return dict(
    )


if __name__ == "__main__":
    socketio.run(app, port=os.getenv("PORT"), debug=True)
