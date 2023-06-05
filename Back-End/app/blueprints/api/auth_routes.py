from flask import request, jsonify

from . import bp
from app.models import User

# register a new user
@bp.post('/register-user')
def register_user():
    # this is the format the request will be recieved in
    content = request.json
    username = content['username']
    email = content['email']
    password = content['password']
    # error handling for username
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({'message':'that Username is taken, please use a different Username'})
    # error handling for email
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({'message':'that email is taken, please use a different Email'})
    # create a new instance of User
    user = User(email=email, username=username)
    user.password = user.hash_password(password)
    user.commit()
    return jsonify({'message': f'{user.username} is now a valid user'})

# verify a user
@bp.post('/verify-user')
def verify_user():
    # the format the request is recieved in
    content = request.json
    username = content['username']
    password = content['password']
    # error handling for no username or password
    if not username or not password:
        return jsonify({'message':'invalid request, please provide both a a Username and Password'}), 400 # 400 means bad request
    # query the User table for a user with the given name
    user = User.query.filter_by(username=username).first()
    # send the user token if user
    if user:
        if user.check_password(password):
            return jsonify([{'user_token': user.token}])
        # error handling for incorrect password
        else:
            return jsonify({'message': 'invalid password.'}), 401 # 401 means unauthorized user
    # error handling for incorrect username
    else:
        return jsonify({'message': 'invalid username.'}), 401

