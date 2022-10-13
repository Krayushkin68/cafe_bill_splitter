from rest_framework.serializers import ModelSerializer

from bill_app.models import Position, Participant


class PositionSerializer(ModelSerializer):
    class Meta:
        model = Position
        fields = ['id', 'name', 'price', 'count']


class ParticipantSerializer(ModelSerializer):
    class Meta:
        model = Participant
        fields = ['id', 'name']
