from flask import Flask

app = Flask(__name__,
    static_folder = './public',
    template_folder="./static")

from .revscript.views import revscript_blueprint
app.register_blueprint(revscript_blueprint)