from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from bill_app.models import Position
from bill_app.serializers import PositionSerializer


class PositionViewSet(viewsets.ModelViewSet):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer
    permission_classes = (IsAuthenticated,)
