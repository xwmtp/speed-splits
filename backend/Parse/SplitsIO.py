import logging
import requests
import pandas as pd
import numpy as np

logger = logging.getLogger('splt.parse.splitsio')

def parse_splits_io(id):
    splits_json = make_request(f'https://splits.io/api/v4/runs/{transform_id(id)}')
    if splits_json:
        return build_base_df(splits_json)

def transform_id(id):
    new_id = id
    for pattern in ['https://', 'www.', 'splits.io/']:
        new_id = new_id.replace(pattern, '')
    return new_id

def build_base_df(splits_json):
    rows = []
    for segment in splits_json['run']['segments']:
        row = {
            'name': segment['display_name'],
            'duration': segment['realtime_duration_ms'],
            'gold': segment['realtime_shortest_duration_ms']
        }
        rows.append(row)
    df = pd.DataFrame(rows)
    df = df.replace(0, np.nan)
    return df

def make_request(url, attempts=5):
    for i in range(attempts):
        response = requests.get(url)
        status = response.status_code

        if status == 200:
            return response.json()
        if status == 404:
            return
        logging.error(f"API error {url} (after {i+1} attempts)")