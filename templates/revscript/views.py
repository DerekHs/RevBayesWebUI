
from flask import render_template, Blueprint

revscript_blueprint = Blueprint('revscript', __name__)

@revscript_blueprint.route('/')
def index():
    return render_template("./public/index.html")