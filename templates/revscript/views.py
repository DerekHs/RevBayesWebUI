
from flask import url_for, send_from_directory, flash, redirect, render_template, Blueprint, request, send_file, jsonify
import subprocess
import os
import shlex
from ..parseNexus import pythonParser
from werkzeug.utils import secure_filename

revscript_blueprint = Blueprint('revscript', __name__)


"""
Renders homepage
"""
@revscript_blueprint.route('/')
def index():
    return render_template("./public/index.html")


"""
Handles FETCH request to /templates/api/upload
Temporarily saves file then deletes from directory
Returns: Json file of taxa
"""
@revscript_blueprint.route('/templates/api/upload', methods = ['GET', 'POST'])
def fileUpload():

    """
    Handle File Uploads
    """
    if request.method == 'POST':
        
        """ Check that the request contains file """
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files.get('file')

        """ Check that a file was selected """
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)




        filename = secure_filename(file.filename)

        """ Temporarily saves file to templates/api/upload """
        file.save(os.path.join('./templates/api/upload', filename))

        """ Parses the file and retrieves a dict of taxa """
        taxa = pythonParser(filename)

        """ Deletes file after use """
        os.remove(os.path.join('./templates/api/upload', filename))

        return jsonify(taxa)

    return render_template("./public/index.html")
