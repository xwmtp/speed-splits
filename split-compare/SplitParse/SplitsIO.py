import logging
import requests
from Segment import Segment

logger = logging.getLogger('splt.parse.splitsio')


def parse_splits_io(id):
    splits_json = request_splits(f'https://splits.io/api/v4/runs/{id}')
    return parse_segments(splits_json)

def parse_segments(splits_json):
    return [Segment(segment['display_name'], segment['realtime_duration_ms'], segment['realtime_shortest_duration_ms'])
    for segment in splits_json['run']['segments']]


def request_splits(url, attempts=5):
    for i in range(attempts):
        response = requests.get(url)
        status = response.status_code

        if status == 200:
            return response.json()
        logging.error(f"API error {url} (after {attempts} attempts)")