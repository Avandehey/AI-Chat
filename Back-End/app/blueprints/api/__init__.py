from flask import Blueprint

bp = Blueprint('api',__name__, url_prefix='/api')

from app.blueprints.api import get_routes, post_routes, auth_routes