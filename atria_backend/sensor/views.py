from rest_framework.views import APIView
from sensor.serializers import SensorDataSerializer
from rest_framework.response import Response
from sensor.models import SensorData

class SensorDataView(APIView):

    def post(self, request):
        """Store Sensor reading data in DB"""
        serializer = SensorDataSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)
    
    def get(self, request):
        """Get the all sensor reading data."""
        data = SensorData.objects.all()
        serializer = SensorDataSerializer(data)
        return serializer.data


