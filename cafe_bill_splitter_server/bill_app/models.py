from django.contrib.auth.models import User
from django.db import models


class Participant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)


class Position(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True)
    price = models.FloatField()
    count = models.IntegerField()
    participants = models.ManyToManyField(Participant, through='PositionParticipant')


class PositionParticipant(models.Model):
    position = models.ForeignKey(Position, on_delete=models.CASCADE)
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    count = models.IntegerField(default=-1)

    class Meta:
        unique_together = ['position', 'participant']
