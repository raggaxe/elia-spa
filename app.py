import time
import os
from flask import Flask, render_template, redirect, url_for
from flask_dance.contrib.facebook import make_facebook_blueprint
from flask_socketio import *
from dotenv import load_dotenv
from datetime import datetime, timedelta
from dotenv import load_dotenv
from Controllers import (
    AdminRoutes,
    AuthRoutes,
    IndexRoutes,
    UserRoutes,
    SquadRoutes,
    OverlayRoutes,
    DefaultRoutes,
)
from Services.playersAPI import *
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
    AdminRoutes.mod,
    AuthRoutes.mod,
    IndexRoutes.mod,
    UserRoutes.mod,
    SquadRoutes.mod,
    OverlayRoutes.mod,
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
    def searchDia(timeStamp):
        dt_object = datetime.fromtimestamp(timeStamp).strftime("%d %b")
        return dt_object

    def searchHora(timeStamp):
        dt_object = datetime.fromtimestamp(timeStamp).strftime("%H:%M")
        return dt_object

    def lastUpdate(timeStamp):
        dt_object = datetime.fromtimestamp(timeStamp).strftime("%d/%m/%Y às %H:%M:%S")
        return dt_object

    def updateTime(timeStamp):
        duration = (timeStamp - datetime.now()) * -1
        return humanfriendly.format_timespan(duration)

    def searchAvatar(token):
        try:
            dataUser = CheckuserRedis(auth=token).GetUser()
            return dataUser["foto"]

        except Exception as e:
            return False

    def searchUser(token):
        try:
            user = CheckuserRedis(auth=token).GetUser()
            return user["player"]
        except Exception as e:
            return str(e)

    def searchUsernameByToken(token):
        try:
            if token == session["idUser"]:
                return "Você"
            else:
                dataUser = CheckuserRedis(auth=token).GetUser()
                return dataUser["username"]
        except Exception as e:
            return str(e)

    def searchPhotoByUsername(token):
        try:
            dataUser = CheckuserRedis(auth=token).GetUser()
            return dataUser["foto"]
        except Exception as e:
            return str(e)

    def GeradorTokenSessionOverlay():
        session["overlay"] = hex(random.getrandbits(128)).lstrip("0x")
        CheckuserRedis(auth=session["idUser"]).abriSession(session["overlay"])
        return session["overlay"]

    return dict(
        searchPhotoByUsername=searchPhotoByUsername,
        updateTime=updateTime,
        lastUpdate=lastUpdate,
        searchUsernameByToken=searchUsernameByToken,
        searchAvatar=searchAvatar,
        searchHora=searchHora,
        searchDia=searchDia,
        searchUser=searchUser,
        GeradorTokenSessionOverlay=GeradorTokenSessionOverlay,
    )


if __name__ == "__main__":
    socketio.run(app, port=os.getenv("PORT"), debug=True)
