from django.db import models

# Creating DB model.

class Note(models.Model):
    body = models.TextField(null = True, blank = True)
    updated = models.DateTimeField(auto_now = True) # Everytime the save method is run it's going to take a timestamp
    created = models.DateTimeField(auto_now_add = True) # Takes timestamp on the creation of that model (only creation timestamp)

    def __str__(self):
        return self.body[0:50]