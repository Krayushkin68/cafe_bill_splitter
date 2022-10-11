from django.contrib.auth.models import User
from django.db import models


class Position(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True)
    price = models.FloatField()
    count = models.IntegerField()
