import logging
import re
import pandas as pd
import numpy as np

logger = logging.getLogger('splt.parse.rawdata')

def parse_raw_data(data_string):
    lines = [line for line in data_string.splitlines() if line != '']
    if len(lines) == 0:
        return {'error': 'Raw splits data is empty'}
    delimiter = parse_delimiter(lines[0])
    if not delimiter:
        return {
            'error': "Couldn't detect a valid delimiter in the raw splits data. Columns should be separated by tabs, commas or semicolons"}
    columns = get_columns([l.split(delimiter) for l in lines])
    if len(columns) == 0 or not (all(len(c) == len(columns[0]) for c in columns)):
        return {'error': "Couldn't detect all same length columns in raw splits data"}
    pb_golds = get_pb_and_gold_columns(columns)
    split_names = get_split_names_column(columns)
    if not pb_golds:
        return {
            'error': "Couldn't detect correct columns in raw splits data. 1st column should be segment names, 2nd the segment durations, 3rd the gold durations. Example:\n"
                     "FirstSplit;5:02.12;4:58.33\n"
                     "SecondSplit;1:42.51;1:40.19\n"}
    df = pd.DataFrame({'name': split_names, 'duration': pb_golds[0], 'gold': pb_golds[1]})
    df = df.replace(0, np.nan)
    return {'df': df}

def parse_delimiter(line):
    for delimiter in ['\t', ',', ';']:
        if delimiter in line:
            return delimiter

def get_columns(rows):
    columns = {}
    for row in rows:
        for i in range(len(row)):
            if i not in columns:
                columns[i] = []
            columns[i].append(row[i])
    return list(columns.values())

def get_split_names_column(columns):
    return columns[0]

def get_pb_and_gold_columns(columns):
    candidate_columns = [col for col in columns if all(is_timestamp(c) for c in col)]
    candidate_columns = [[timestamp_to_milliseconds(ts) for ts in col] for col in candidate_columns]
    if len(candidate_columns) >= 3:
        pbs = candidate_columns[1]
        golds = candidate_columns[2]
    elif len(candidate_columns) == 2:
        pbs = candidate_columns[0]
        golds = candidate_columns[1]
    else:
        return
    return pbs, golds

def is_timestamp(str):
    if str.isdigit() or str == '' or str == '-':
        return True
    match = re.match(r"(\d?\d:)?\d?\d:\d?\d(\.\d+)?$", str)
    if match:
        return True
    return False

def timestamp_to_milliseconds(timestamp):
    if timestamp == '' or timestamp == '-':
        return 0
    if timestamp.isdigit():
        return int(timestamp)
    if len(timestamp.split(':')) < 3:
        timestamp = '0:' + timestamp
    ts = timestamp.split(':')
    hours = int(ts[0]) * 3600 * 1000
    minutes = int(ts[1]) * 60 * 1000
    seconds = float(ts[2]) * 1000
    return hours + minutes + seconds
