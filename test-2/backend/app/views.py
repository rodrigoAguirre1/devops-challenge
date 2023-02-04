from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse

def main(request):
    return HttpResponse("<h1>Esto es un backend en Django para el DevOps challenge.</h1>")

@api_view(['GET'])
def send_data(request):
    return Response({
        "data": "Hello from django backend"
    })
