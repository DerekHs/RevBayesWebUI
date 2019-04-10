
from flask import render_template, Blueprint, request
from flask_cors import CORS, cross_origin
import os.path
import subprocess
import shlex
from ..parseWithCPP import execCPP

revscript_blueprint = Blueprint('revscript', __name__)
CORS(revscript_blueprint)

@revscript_blueprint.route('/')
def index():
    return render_template("./public/index.html")

@revscript_blueprint.route('/api/upload', methods = ['POST'])
def upload_file():
    file = request.files.get('file')
    filename = '/api/upload/' + file.filename

    print(file)
    print(filename)

    execCPP('./nexy', filename)

    return "file uploaded"

