from django.apps import AppConfig
from django.core.signals import request_finished

class TodoConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'todo'
    
    def ready(self):
        # Implicitly connect signal handlers decorated with @receiver.
        from .profiles import signals

        # Explicitly connect a signal handler.
        request_finished.connect(signals.create_profile_handler, dispatch_uid="my_unique_identifier")
