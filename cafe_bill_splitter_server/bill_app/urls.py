from rest_framework.routers import DefaultRouter

from bill_app.views import PositionViewSet, PartisipantViewSet

router = DefaultRouter()
router.register('positions', PositionViewSet, basename='positions')
router.register('participants', PartisipantViewSet, basename='participants')

urlpatterns = [
]
urlpatterns += router.urls
