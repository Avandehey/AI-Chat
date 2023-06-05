from flask import request, jsonify
from functools import wraps
from app.models import User

#used to break down and check the token for a user with that token
def token_required(flask_route):
    @wraps(flask_route)
    def wrapper(*args, **kwargs):
        if 'x-access-token' in request.headers: #check if the 'x-access-token' is present in the request header
            # extract the token from the request headers
            try:
                token = request.headers['x-access-token'].split()[1]
                # query the user table for a user with the given  token
                user = User.query.filter_by(token=token).first()
                if user:
                    # call the origional flask_route with the user object
                    return flask_route(user, *args, **kwargs)
                # error handling
                else:
                    return jsonify({"message": "Invalid Token. Please provide a valid Token."}), 401 # 401 means user unauthorized
            except IndexError:
                return jsonify({"message": "Invalid Token format. Please include a valid Token in the 'x-access-token' header."}), 400 # 400 means bad request
            except:
                return jsonify({"message": "An error occurred while processing the Token. Please try again."}), 400
        else:
            return jsonify({"message": "Missing Token. Please include a token in the 'x-access-token' header."}), 401
    return wrapper