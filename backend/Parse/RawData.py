import logging
import re
import requests
import pandas as pd
import numpy as np

logger = logging.getLogger('splt.parse.rawdata')

def parse_raw_data(data_string):
    lines = data_string.splitlines()
    if len(lines) == 0:
        return
    delimiter = parse_delimiter(lines[0])
    print(delimiter)
    if not delimiter:
        return
    print(delimiter)
    columns = get_columns([l.split(delimiter) for l in lines])
    get_pb_and_gold_columns(columns)


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
    return columns.values()

def get_split_names_column(columns):
    pass

def get_pb_and_gold_columns(columns):
    candidate_columns = [col for col in columns if all(is_timestamp(c) for c in col)]
    print(candidate_columns)


def is_timestamp(str):
    if str.isdigit():
        return True
    match = re.match(r"(\d\d:)?\d?\d:\d?\d(\.\d+)", str)
    if match:
        return True
    return False

    

