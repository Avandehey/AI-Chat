from werkzeug.security import generate_password_hash, check_password_hash
from secrets import token_urlsafe

from datetime import datetime
import uuid

from app import db

# User class, the user_id will automatically be generated as a uuid key, the password will automatically be hashed
class User(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()))
    username = db.Column(db.String(15), unique=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(25), nullable=False)
    token = db.Column(db.String(250), unique=True, default=token_urlsafe(32))

    conversations = db.relationship('Conversation', backref='user', lazy=True)

    def __repr__(self):
        return f'User: {self.username}'
    
    def __init__(self, *args, **kwargs):
        super(User, self).__init__(*args, **kwargs)
        self.password = self.hash_password(self.password)
    
    def commit(self):
        db.session.add(self)
        db.session.commit()
    
    def hash_password(self, password):
        return generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)

# a conversation class that stores the messages connected to each conversation
class Conversation(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()))
    name = db.Column(db.string(50),default=str('Random Conversation'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    messages = db.relationship('Message', backref='conversation', lazy=True)

    def __repr__(self):
        return f'<Conversation: {self.name}>'

    def commit(self):
        db.session.add(self)
        db.session.commit()

# each message is saved as a instance of the message class with a relationship to the conversation it happened in
class Message(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()))
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversation.id'))
    body = db.Column(db.String(1000))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    sender = db.Column(db.String(10))

    def __repr__(self):
        return f'<Message: {self.body}>'

    def commit(self):
        db.session.add(self)
        db.session.commit()