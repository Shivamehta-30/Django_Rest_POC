from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from app.serlializers import ItemSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Item

def index(request):
    # Render the HTML template
    return render(request, 'app/index.html')

def list_items_page(request):
    return render(request, 'app/items_list.html')

def update_item(request, pk):
    # Your logic to handle update
    return JsonResponse({'status': 'success'})

def delete_item(request, pk):
    # Your logic to handle deletion
    return JsonResponse({'status': 'success'})

@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'List Items': '/items/',
        'Detail View': '/item/<int:pk>/',
        'Create': '/item/create/',
        'Update': '/item/update/<int:pk>/',
        'Delete': '/item/delete/<int:pk>/',
    }
    return Response(api_urls)

@api_view(['GET'])
def list_items(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_item(request, pk):
    item = get_object_or_404(Item, pk=pk)
    serializer = ItemSerializer(item)
    return Response(serializer.data)

@api_view(['POST'])
def create_item(request):
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def update_item(request, pk):
    item = get_object_or_404(Item, pk=pk)
    serializer = ItemSerializer(item, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def delete_item(request, pk):
    item = get_object_or_404(Item, pk=pk)
    item.delete()
    return Response({'message': 'Item deleted successfully'}, status=204)
