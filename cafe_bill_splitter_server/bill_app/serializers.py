from rest_framework import serializers

from bill_app.models import Position, Participant, PositionParticipant


class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = ['id', 'name']


class PositionParticipantSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='participant.id')
    name = serializers.CharField(max_length=100, source='participant.name', read_only=True)

    class Meta:
        model = PositionParticipant
        fields = ['id', 'name', 'count']


class PositionSerializer(serializers.ModelSerializer):
    participants = PositionParticipantSerializer(many=True, read_only=False, source='positionparticipant_set')

    class Meta:
        model = Position
        fields = ['id', 'name', 'price', 'count', 'participants']

    def update(self, instance: Position, validated_data):
        if 'positionparticipant_set' in validated_data:
            instance.participants.clear()
            for participant_data in validated_data.pop('positionparticipant_set'):
                participant = self._get_participant_object(participant_data, instance.user_id)
                PositionParticipant.objects.update_or_create(position=instance,
                                                             participant=participant,
                                                             defaults={'count': participant_data['count']})

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance

    def create(self, validated_data):
        participants_data = validated_data.pop('positionparticipant_set')
        instance = Position.objects.create(**validated_data)

        for participant_data in participants_data:
            participant = self._get_participant_object(participant_data, instance.user_id)
            PositionParticipant.objects.create(position=instance,
                                               participant=participant,
                                               count=participant_data['count'])
        instance.save()
        return instance

    @staticmethod
    def _get_participant_object(data, user_id):
        try:
            participant_id = data['participant']['id']
            participant = Participant.objects.get(pk=participant_id)
            if participant.user_id != user_id:
                raise serializers.ValidationError('Not valid Participant provided for current user',
                                                  code='participant_not_valid')
            return participant
        except Participant.DoesNotExist:
            raise serializers.ValidationError(f'Participant object with provided ID ({participant_id}) not found',
                                              code='participant_not_found')
