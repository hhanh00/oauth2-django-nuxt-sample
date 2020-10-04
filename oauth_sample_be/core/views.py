from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *

@api_view()
def get_user(request):
  ser = UserSerializer(request.user)
  return Response(ser.data)
