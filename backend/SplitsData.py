from Duration import Duration
import pandas as pd
import numpy as np
import json


def get_table_data(you_base_df, them_base_df=None):
    you_df = _add_time_save_columns(you_base_df)
    print(you_df)
    if them_base_df is None:
        you_df = build_you_df(you_df)
        return df_to_json(you_df, 'you_data', decimals=1)

    them_df = _add_time_save_columns(them_base_df)
    vs_df = build_you_vs_them_df(you_df, them_df)

    return df_to_json(vs_df, 'vs_data', decimals=1)

def build_you_df(you_df):
    you_df = _add_balanced(you_df)
    you_df = you_df.drop(['pb_gold'], axis=1)
    return you_df.add_suffix('_you')

def build_you_vs_them_df(you_df, them_df):
    vs_df = pd.DataFrame()
    you_them_df = pd.concat([you_df.add_suffix('_you'), them_df.add_suffix('_them')], axis=1)
    vs_df['gold_vs_gold'] = _get_col_vs_col(you_them_df, 'gold_you', 'gold_them')
    vs_df['pb_vs_pb'] = _get_col_vs_col(you_them_df, 'duration_you', 'duration_them')
    vs_df['gold_vs_pb'] = _get_col_vs_col(you_them_df, 'gold_you', 'duration_them')
    you_vs_them_df = pd.concat([you_df.add_suffix('_you'), vs_df, them_df.add_suffix('_them')], axis=1)
    for col in ['pb_gold', 'timesave']:
        you_vs_them_df = you_vs_them_df.drop(col + '_you',  axis=1)
        you_vs_them_df = you_vs_them_df.drop(col + '_them', axis=1)
    return you_vs_them_df

def _get_col_vs_col(you_them_df, you_col, them_col):
    you_vs_col = []
    them_vs_col = []
    prev_skipped_segments_you = 0
    prev_skipped_segments_them = 0
    for index, row in you_them_df.iterrows():
        you_vs_col.append(row[you_col] + prev_skipped_segments_you)
        them_vs_col.append(row[them_col] + prev_skipped_segments_them)
        if np.isnan(row[you_col]) and not np.isnan(row[them_col]):
            prev_skipped_segments_them += row[them_col]
        if np.isnan(row[them_col]) and not np.isnan(row[you_col]):
            prev_skipped_segments_you += row[you_col]
        if not np.isnan(row[them_col]) and not np.isnan(row[you_col]):
            prev_skipped_segments_you = 0
            prev_skipped_segments_them = 0
    return pd.Series(you_vs_col) - pd.Series(them_vs_col)

def _add_time_save_columns(df):
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

def _add_balanced(df):
    total_timesave = df['duration'].sum() - df['gold'].sum()
    percs = df['gold'] / df['gold'].sum()
    balanced = df['gold'] + percs * total_timesave
    df['balanced'] = balanced
    return df

def cells_to_strings(df, decimals=3):
    print_df = df.copy()
    for col in get_numeric_cols(df):
        print_df[col] = print_df[col].apply(lambda ms: Duration(ms).to_string_rounded(decimals))
    return print_df

def get_total_row(df):
    total_row = {}
    for col in df.columns:
        if col in get_numeric_cols(df):
            total_row[col] = sum(df.fillna(0)[col])
        else:
            total_row[col] = ''
    return total_row

def get_numeric_cols(df):
    return df.select_dtypes(include=[np.number]).columns

def df_to_json(df, type, decimals=3):
    df = df.append(get_total_row(df), ignore_index=True)
    str_df = df.copy()
    str_df[str_df['name_you'] != ''] = cells_to_strings(df[df['name_you'] != ''], decimals)
    str_df[str_df['name_you'] == ''] = cells_to_strings(df[df['name_you'] == ''], decimals)
    str_df = str_df.fillna('')
    data = {'splits_data' : {
                'type' : type,
                'columns' : list(str_df.columns),
                'data' : str_df.to_dict(orient='records')
    }}
    print(json.dumps(data))
    return json.dumps(data)
