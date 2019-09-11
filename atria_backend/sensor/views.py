from datetime import datetime, timedelta
from rest_framework.views import APIView
from django.db.models import Min, Max, Avg
from sensor.serializers import SensorDataSerializer, GetSernsorDataSerializer
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
        parms = request.GET
        start_date = parms.get("startDate", datetime.now() - timedelta(days=7))
        last_date = parms.get("lastDate", datetime.now())
        data = SensorData.objects.filter(created_at__gte=start_date)\
                                .filter(created_at__lte=last_date)
        serializer = GetSernsorDataSerializer(data, many=True)
        return Response(serializer.data)

class LineChart(APIView):

    def get(self, request):
        parms = request.GET
        # highchart data for line chart
        start_date = parms.get("startDate", datetime.now() - timedelta(days=7))
        last_date = parms.get("lastDate", datetime.now())
        data = SensorData.objects.filter(created_at__gte=start_date)\
                                .filter(created_at__lte=last_date).values('sensor_type').annotate(min=Min('reading'), 
                                    max=Max('reading'),
                                    avg=Avg('reading'))
        categories = []
        min = []
        max = []
        avg = []
        for i in data:
            categories.append(i.get('sensor_type'))
            max.append(i.get('max'))
            min.append(i.get('min'))
            avg.append(i.get('avg'))
        # create response value for line chart.
        line_chart_data ={
            "categories": categories,
            "series": [{
                    "name": "Min",
                    "data": min
                },
                {
                    "name": "Max",
                    "data": max
                },
                {
                    "name": "Avg",
                    "data":avg
                }
            ]
        }
        return Response(line_chart_data)


