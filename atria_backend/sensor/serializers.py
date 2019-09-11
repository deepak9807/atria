from rest_framework import serializers
from sensor.models import SensorData


class SensorDataSerializer(serializers.Serializer):
    reading = serializers.FloatField()
    timestamp = serializers.DateTimeField()
    sensorType = serializers.CharField()

    def create(self, validated_data):
        reading = validated_data.get("reading")
        created_at = validated_data.get("timestamp")
        sensor_type = validated_data.get("sensorType")
        # store incoming data in DB.
        SensorData.objects.create(
            sensor_type=sensor_type,
            reading=reading,
            created_at=created_at
        )
        return validated_data

class GetSernsorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorData
        fields = '__all__'