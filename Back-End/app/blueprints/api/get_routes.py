from flask import request, jsonify

from . import bp
from app.models import Conversation, Message
from app.blueprints.api.helpers import token_required

# route to get all conversations for the user
@bp.get('/conversations')
@token_required
def get_conversations(user):
    try:
        conversations = user.conversations
        if not conversations:
            return jsonify({'message': 'No conversations found for the user'}), 404
        result = []
        for conversation in conversations:
            result.append({
                'id': conversation.id,
                'name': conversation.name,
                'timestamp': conversation.timestamp,
                'url': conversation.url
            })
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'message': 'Failed to retrieve conversations', 'error': str(e)}), 500

# route to get all messages in a conversation
@bp.get('/messages/<conversation_id>')
@token_required
def get_messages(user, conversation_id):
    print("in git messages")
    try:
        conversation = Conversation.query.filter_by(id=conversation_id, user_id=user.id).first()
        if not conversation:
            return jsonify({'message': 'Conversation wasent\'t found'}), 404
        messages = conversation.messages
        result = []
        for message in messages:
            result.append({
                'body': message.body,
                'timestamp': message.timestamp,
                'sender': message.sender
            })
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'message': 'Failed to retrieve messages', 'error': str(e)}), 500
