from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from bill_app.models import Position, Participant
from bill_app.serializers import PositionSerializer, ParticipantSerializer


class PositionViewSet(viewsets.ModelViewSet):
    serializer_class = PositionSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def get_queryset(self):
        user = self.request.user
        return Position.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PartisipantViewSet(viewsets.ModelViewSet):
    serializer_class = ParticipantSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def get_queryset(self):
        user = self.request.user
        return Participant.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
