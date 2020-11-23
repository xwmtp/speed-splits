from util import to_timedelta
import datetime as dt

class Segment:

    def __init__(self, name, duration, gold):
        self.name = name
        self.duration = Duration(duration)
        self.gold = Duration(gold)
        self.timesave = Duration(duration - gold)


    def __str__(self):
        return f'{self.name}, {self.duration}, {self.gold}, {self.timesave}'


class VS_segment:

    def __init__(self, you_segment, them_segment):
        self.you = you_segment
        self.them = them_segment
        self.gold_vs_gold = Duration(self.you.gold.ms - self.them.gold.ms)
        self.pb_vs_pb = Duration(self.you.duration.ms - self.them.duration.ms)
        self.gold_vs_pb = Duration(self.you.gold.ms - self.them.duration.ms)

    def __str__(self):
        return f'{self.you.name}/{self.them.name} {self.gold_vs_gold}, {self.pb_vs_pb}, {self.gold_vs_pb}'

class Duration:

    def __init__(self, ms):
        self.ms = ms

    def __str__(self):
        sign = '-' if self.ms < 0 else ''
        timestamp = str(dt.timedelta(milliseconds=abs(self.ms)))
        timestamp = ':'.join(timestamp.split(':')[1:])
        if '.' in timestamp:
            timestamp = f"{timestamp.split('.')[0]}.{timestamp.split('.')[1][:2]}"
        return sign + timestamp
