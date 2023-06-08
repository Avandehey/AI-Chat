from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__) # creates instance of Flask app, name is the resource passed in
app.config.from_object(Config) # loads config for Flask from Config obj
db = SQLAlchemy(app) # creates instance of SQLAlchemy, which allows me to work with my database
migrate = Migrate(app, db) # creates instance of migrate which gives support for database operations

cors = CORS(app, origins='http://localhost:5173')  # Enable CORS for all routes with credentials support

# my initial route to my blueprint.api
from app.blueprints.api import bp as api_bp
app.register_blueprint(api_bp)

# this needs to be at the bottom of the page for some reason I can't remember
from app import models
