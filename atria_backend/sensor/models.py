from django.db import models

class SensorData(models.Model):
    sensor_type = models.CharField(max_length=255, null=True, blank=True)
    reading = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField()
    # updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.sensor_type}::{self.reading}'

    def __repr__(self):
        return f'SensorData({self.sensor_type}:{self.reading})'

    class Meta:
        ordering = ['-created_at']