from sensor.views import SensorDataView, LineChart
from django.urls import path
app_name = 'sensor'

urlpatterns = [
    path('add/', SensorDataView.as_view()),
    path('data/', SensorDataView.as_view()),
    path('chart/', LineChart.as_view())
]