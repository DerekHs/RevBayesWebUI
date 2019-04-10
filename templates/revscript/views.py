
from flask import render_template, Blueprint, request, send_file, jsonify
import subprocess
import shlex
from ..parseWithCPP import execCPP

revscript_blueprint = Blueprint('revscript', __name__)


@revscript_blueprint.route('/')
def index():
    return render_template("./public/index.html")

@revscript_blueprint.route('/api/upload', methods = ['GET', 'POST'])
def upload_file():
    file = request.files.get('file')
    filename = '/api/upload/' + file.filename

    print(file)
    print(filename)

    execCPP('./nexy', filename)

    print('worked')
    
    return jsonify({"TAXA" : ['gorilla', 'chimpanzee', 'human', 'orangutan']})

