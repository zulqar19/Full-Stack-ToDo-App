from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import TaskSerializer
from .models import Task


# Create your views here.

@api_view(['GET'])
def ApiOverView(request):
    api_urls = {
        'List' : '/task-list/',
        'DetailView' : '/detail-view/',
        'Create' : '/task-create/',
        'Update' : '/task-update/',
        'Delete' : '/task-delete/'
    }

    return Response(api_urls)

@api_view(['GET'])
def TaskList(request):
    user = request.user
    print('user get: ' + str(request.user))
    tasks = Task.objects.filter(user = user)
    serializer = TaskSerializer(tasks, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def DetailView(request , pk):
    tasks = Task.objects.get(id = pk)
    serializer = TaskSerializer(tasks, many = False)
    return Response(serializer.data)

@api_view(['POST'])
def TaskCreate(request):
    data = request.data   
    data['user'] = request.user.id
    serializer = TaskSerializer(data = data)

    try:
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            print('Post Created ' + serializer.data)
    except Exception as e: 
        print(e)

    return Response(serializer.data , status=201)

@api_view(['POST'])
def TaskUpdate(request , pk):
    data = request.data   
    data['user'] = request.user.id
    task = Task.objects.get(id = pk)
    serializer = TaskSerializer(instance=task ,data=request.data)

    try:
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            print('Post updated ' + serializer.data)
    except Exception as e: 
        print(e)

    return Response(serializer.data , status=202)

@api_view(['DELETE'])
def TaskDelete(request , pk):
    print("id " , pk)
    data = request.data   
    data['user'] = request.user.id
    task = Task.objects.get(id = pk)
    task.delete()


    return Response('Item deleted')

