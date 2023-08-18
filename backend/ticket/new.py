import requests
from django.http import JsonResponse


def ticketmaster_events(request):
    url = "https://app.ticketmaster.com/discovery/v2/events.json"
    api_key = "sF2GLCdXyqj6oTEEBwIz5eqTF7D80heE"
    params = {
        "apikey": api_key,
        "classificationName": "music",
        "size": 10
    }
    try:
        response = requests.get(url, params=params)
        events = []
        if response.status_code == 200:
            data = response.json()
            for event in data["_embedded"]["events"]:
                event_data = {
                "date_time": event["dates"]["start"]["dateTime"] if 'dateTime' in event["dates"]["start"] else 'No Date',
                "icon": event["images"][0]["url"],
                "genre": event["classifications"][0]["genre"]["name"],
                "event": event["name"],
                "venue": event["_embedded"]["venues"][0]["name"]
                # "venue_details":
                    }
                events.append(event_data)
            return JsonResponse({"events": events})
    except Exception as e:
        print(str(e))
        return JsonResponse({"events": {}})