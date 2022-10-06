from rest_framework.serializers import ModelSerializer

from bill_app.models import Position


class PositionSerializer(ModelSerializer):
    class Meta:
        model = Position
        fields = ['name', 'price', 'count']
