import json
import requests
from django.http import JsonResponse
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_suggested_events(request):
    keyword = request.GET.get('keyword')
    classification_name = request.GET.get('classification_name')
    radius = request.GET.get('radius', 10)
    auto_detect = request.GET.get('auto_detect')
    source = request.GET.get('source')

    if auto_detect == 'true':
        ipinfo_response = requests.get(f'https://ipinfo.io/json?token=70ac718c9393c1')
        ipinfo_data = ipinfo_response.json()
        latitude, longitude = ipinfo_data['loc'].split(',')
    else:
        data = {}
        if source:
            address = source.replace(' ', '+')
            response = requests.get(f'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key=AIzaSyAcOmobarzmrrkhz_Za0L4CPVwKhbIwKpw')
            data = response.json()

        if 'results' not in data or len(data['results']) == 0:
            return JsonResponse({'error': 'Location not found'})

        location = data['results'][0]['geometry']['location']
        latitude, longitude = location['lat'], location['lng']

    response = requests.get(f'https://app.ticketmaster.com/discovery/v2/events?apikey=sF2GLCdXyqj6oTEEBwIz5eqTF7D80heE&keyword={keyword}&latlong={latitude},{longitude}&radius={radius}&classificationName={classification_name}&size=10')
    data = response.json()
# safe = false means returning single non dictionary object
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def get_event_details(request):
    venue_id = request.GET.get('venue_id')

    response = requests.get(f'https://app.ticketmaster.com/discovery/v2/venues/{venue_id}.json?apikey=sF2GLCdXyqj6oTEEBwIz5eqTF7D80heE')
    data = response.json()

    return JsonResponse(data, safe=False)
