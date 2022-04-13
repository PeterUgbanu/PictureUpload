from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('api.urls')),
    path('docs/', include_docs_urls(title='PictureUploadAPI')),
    path('schema', get_schema_view(
        title="Picture Upload API",
        description="API for its users to upload their images and view them",
        version="1.0.0"
    ), name="openapi-schema")
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
