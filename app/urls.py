from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('items/', views.list_items, name='list_items'),
    path('items/list/', views.list_items_page, name='list_items_page'),
    path('item/create/', views.create_item, name='create_item'),
    path('item/<int:pk>/', views.get_item, name='get_item'),
    path('item/update/<int:pk>/', views.update_item, name='update_item'),
    path('item/delete/<int:pk>/', views.delete_item, name='delete_item'),
]
