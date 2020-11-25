import datetime as dt


def to_timedelta(ms, show_ms=True):
    if show_ms:
        return dt.timedelta(milliseconds=ms)
    else:
        return dt.timedelta(seconds=round(ms/1000))