from rest_framework.routers import DefaultRouter

from bill_app.views import PositionViewSet

router = DefaultRouter()
router.register('positions', PositionViewSet, basename='positions')

urlpatterns = [
]
urlpatterns += router.urls
