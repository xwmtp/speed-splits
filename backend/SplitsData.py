from Parse.SplitsIO import parse_splits_io
from Duration import Duration
import pandas as pd
import numpy as np

def get_splitsio_data(you_id, them_id=None):
    you_df = parse_splits_io(you_id)
    you_df  = add_time_save_columns(you_df)
    if not them_id:
        return df_to_json(you_df, decimals=1)
    them_df = parse_splits_io(them_id)
    them_df = add_time_save_columns(them_df)
    vs_df = build_vs_df(you_df, them_df)
    return df_to_json(vs_df, decimals=1)


def add_time_save_columns(df):
    df = _fix_durations_shorter_than_gold(df)
    df['pb_gold'] = get_pb_golds(df)
    add_time_save(df)
    return df

def _fix_durations_shorter_than_gold(df):
    df.loc[df['duration'] < df['gold'], 'duration'] = df.loc[df['duration'] < df['gold'],'gold']
    return df

# a gold + the sum of golds in previous skipped splits
def get_pb_golds(df):
    pb_gold_series = []
    prev_skipped_golds = 0
    for index, row in df.iterrows():
        pb_gold_series.append(row['gold'] + prev_skipped_golds)
        if np.isnan(row['duration']):
            prev_skipped_golds += row['gold']
        else:
            prev_skipped_golds = 0
    return pd.Series(pb_gold_series)

def add_time_save(df):
    df['timesave'] = df['duration'] - df['pb_gold']
    df.loc[df['timesave'] < 0, 'timesave'] = 0
    return df

def build_vs_df(you_df, them_df):
    vs_df = pd.DataFrame()
    vs_df['gold_vs_gold'] = you_df['gold'] - them_df['gold']
    vs_df['pb_vs_pb'] = you_df['duration'] - them_df['duration']
    vs_df['gold_vs_pb'] = you_df['gold'] - them_df['duration']
    return vs_df

def cells_to_strings(df, decimals = 3):
    print_df = df.copy()
    numeric_cols = df.select_dtypes(include = [np.number]).columns
    for col in numeric_cols:
        print_df[col] = print_df[col].apply(lambda ms: Duration(ms).to_string_rounded(decimals))
    return print_df

def df_to_json(df, decimals = 3):
    df = cells_to_strings(df, decimals)
    return df.to_json(orient='records')