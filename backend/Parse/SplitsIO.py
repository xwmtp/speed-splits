import logging
import requests
from SegmentsModels import Segments, Segment

logger = logging.getLogger('splt.parse.splitsio')


def parse_splits_io(id):
    splits_json = request_splits(f'https://splits.io/api/v4/runs/{id}')
    segments_list = parse_segments(splits_json)
    return Segments(segments_list)

def parse_segments(splits_json):
    segments = []
    prev_skipped_golds = 0
    for segment in splits_json['run']['segments']:
        name = segment['display_name']
        duration = segment['realtime_duration_ms']
        gold = segment['realtime_shortest_duration_ms']
        segments.append(Segment(name, duration, gold, gold + prev_skipped_golds))
        if segment['realtime_skipped']:
            prev_skipped_golds += gold

        if not segment['realtime_skipped']:
            prev_skipped_golds = 0
    return segments





def request_splits(url, attempts=5):
    for i in range(attempts):
        response = requests.get(url)
        status = response.status_code

        if status == 200:
            return response.json()
        logging.error(f"API error {url} (after {attempts} attempts)")