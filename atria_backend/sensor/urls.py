from sensor.views import SensorDataView
from django.urls import path
app_name = 'sensor'

urlpatterns = [
    path('add/', SensorDataView.as_view())
]