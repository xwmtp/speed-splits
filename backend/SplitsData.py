from Duration import Duration
import pandas as pd
import numpy as np
import json


def get_table_data(you_base_df, them_base_df=None):
    you_df = _add_time_save_columns(you_base_df)
    if them_base_df is None:
        you_df = build_you_df(you_df)
        return df_to_json(you_df, 'you_data', decimals=1)

    them_df = _add_time_save_columns(them_base_df)
    vs_df = build_you_vs_them_df(you_df, them_df)

    return df_to_json(vs_df, 'vs_data', decimals=1)

def build_you_df(you_df):
    return you_df.drop(['pb_gold'], axis=1)

def build_you_vs_them_df(you_df, them_df):
    vs_df = pd.DataFrame()
    vs_df['gold_vs_gold'] = you_df['gold'] - them_df['gold']
    vs_df['pb_vs_pb'] = you_df['duration'] - them_df['duration']
    vs_df['gold_vs_pb'] = you_df['gold'] - them_df['duration']
    you_vs_them_df = pd.concat([you_df.add_suffix('_you'), vs_df, them_df.add_suffix('_them')], axis=1)
    for col in ['pb_gold', 'timesave']:
        you_vs_them_df = you_vs_them_df.drop(col + '_you',  axis=1)
        you_vs_them_df = you_vs_them_df.drop(col + '_them', axis=1)
    return you_vs_them_df

def _add_time_save_columns(df):
    df = _fix_durations_shorter_than_gold(df)
    df['pb_gold'] = _get_pb_golds(df)
    df = _add_time_save(df)
    return df


def _fix_durations_shorter_than_gold(df):
    df.loc[df['duration'] < df['gold'], 'duration'] = df.loc[df['duration'] < df['gold'], 'gold']
    return df

# a gold + the sum of golds in previous skipped splits
def _get_pb_golds(df):
    pb_gold_series = []
    prev_skipped_golds = 0
    for index, row in df.iterrows():
        pb_gold_series.append(row['gold'] + prev_skipped_golds)
        if np.isnan(row['duration']):
            prev_skipped_golds += row['gold']
        else:
            prev_skipped_golds = 0
    return pd.Series(pb_gold_series)


def _add_time_save(df):
    df['timesave'] = df['duration'] - df['pb_gold']
    df.loc[df['timesave'] < 0, 'timesave'] = 0
    return df


def cells_to_strings(df, decimals=3):
    print_df = df.copy()
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    for col in numeric_cols:
        print_df[col] = print_df[col].apply(lambda ms: Duration(ms).to_string_rounded(decimals))
    return print_df


def df_to_json(df, type, decimals=3):
    df = cells_to_strings(df, decimals)
    data = {'splits_data' : {
                'type' : type,
                'columns' : list(df.columns),
                'data' : df.to_dict(orient='records')
    }}
    print(data)
    return json.dumps(data)
