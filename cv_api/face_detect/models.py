from django.db import models

class FaceImage(models.Model):
    name = models.CharField(max_length=20)
    image = models.FileField(upload_to='uploads/%Y/%m/%d', default=None)
    url = models.URLField(max_length=200, default=None)
    