from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

# Create your models here.
def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

def image_size(value):
    limit = 1 * 1024 * 1024
    if value.size > limit:
        raise ValidationError('File Too Large')
    return value

class Image(models.Model):
    owner = models.ForeignKey(User, related_name="images", on_delete=models.CASCADE, null=True)
    image = models.ImageField(upload_to=upload_to, validators=[image_size,])

    def __str__(self):
        return f"{self.owner}-{self.image}"


