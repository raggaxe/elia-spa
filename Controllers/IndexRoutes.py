import os
from flask import Flask, session, Markup, Response, flash
from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    send_file,
    make_response,
    jsonify,
)
from flask_dance.contrib.facebook import facebook

mod = Blueprint("index_routes", __name__)



@mod.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")




@mod.route("/mail-mkt", methods=["GET"])
def mkt_maes():
    return render_template("mkt-mail.html")


@mod.route("/privacidade", methods=["GET", "POST"])
def privacidade():
    return render_template("privacidade.html")


@mod.route("/termos", methods=["GET", "POST"])
def termos():
    return render_template("termos.html")


@mod.route("/politicaDeConduta")
def politica_de_conduta():
    return render_template("politica_de_conduta.html")
