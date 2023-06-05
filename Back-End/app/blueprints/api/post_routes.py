from flask import request, jsonify

from . import bp
from app.models import Conversation, Message
from app.blueprints.api.helpers import token_required

# create a conversation
@bp.post('/conversation')
@token_required
def create_conversation(user):
    try:
        content = request.json
        conversation = Conversation(name=content.get('name'), user_id=user.id)
        conversation.commit()
        return jsonify({'message':'Conversation created', 'name': conversation.name, 'conversation_id': conversation.id})
    except:
        return jsonify({'message': 'invalid form, please try again'}), 400

# create individual messages linked to a conversation
@bp.post('/message')
@token_required
def create_message(user):
    try:
        content = request.json
        conversation_id = content.get('conversation_id')
        body = content.get('body')
        sender = content.get('sender')
        # Validate input
        if not all([conversation_id, body, sender]):
            return jsonify({'message': 'Invalid form data, please provide conversation_id, body, and sender.'}), 400
        # Create a new message object
        message = Message(conversation_id=conversation_id, body=body, sender=sender)
        # Commit the message to the database
        message.commit()
        return jsonify({'message': 'Message created', 'body': message.body})
    except:
        return jsonify({'message': 'invalid form, please try again'}), 400
