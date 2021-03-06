from flask import Flask
from flask_cors import CORS
app = Flask(__name__,
    static_folder = './public',
    template_folder="./static")
CORS(app)

from .revscript.views import revscript_blueprint
app.register_blueprint(revscript_blueprint)
