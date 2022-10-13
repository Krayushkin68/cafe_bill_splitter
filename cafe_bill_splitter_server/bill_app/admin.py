from django.contrib import admin

# Register your models here.
from bill_app.models import Position, Participant

admin.site.register(Position)
admin.site.register(Participant)
