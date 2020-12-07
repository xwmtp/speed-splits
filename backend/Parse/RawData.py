import logging
import re
import datetime as dt
import requests
import pandas as pd
import numpy as np

logger = logging.getLogger('splt.parse.rawdata')


def parse_raw_data(data_string):
    lines = data_string.splitlines()
    if len(lines) == 0:
        return
    delimiter = parse_delimiter(lines[0])
    if not delimiter:
        return
    columns = get_columns([l.split(delimiter) for l in lines])
    pb_golds = get_pb_and_gold_columns(columns)
    split_names = get_split_names_column(columns)
    if not pb_golds:
        return
    df = pd.DataFrame({'name': split_names, 'duration': pb_golds[0], 'gold': pb_golds[1]})
    return df


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
    sorted_columns = sorted(candidate_columns, key = lambda col: sum(col))
    try:
        golds = sorted_columns[0]
        pbs = sorted_columns[1]
        return pbs, golds
    except KeyError:
        return


def is_timestamp(str):
    if str.isdigit():
        return True
    match = re.match(r"(\d\d:)?\d?\d:\d?\d(\.\d+)", str)
    if match:
        return True
    return False


def timestamp_to_milliseconds(timestamp):
    if timestamp.isdigit():
        return int(timestamp)
    if len(timestamp.split(':')) < 3:
        timestamp = '0:' + timestamp
    ts = timestamp.split(':')
    hours = int(ts[0]) * 3600 * 1000
    minutes = int(ts[1]) * 60 * 1000
    seconds = float(ts[2]) * 1000
    return hours + minutes + seconds
