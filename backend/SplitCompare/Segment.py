from util import to_timedelta
import datetime as dt

class Segment:

    # if previous splits were skipped, pb_gold has those golds added to this gold
    def __init__(self, name, duration, gold, pb_gold):
        self.name = name
        self.duration = Duration(duration)
        self.gold = Duration(gold)
        self.pb_gold = Duration(pb_gold)
        self.timesave = Duration(duration - pb_gold) if not self.skipped() else Duration(0)

    def skipped(self):
        return self.duration.ms == 0

    def __str__(self):
        return f'{self.name}, {self.duration}, {self.gold}, {self.pb_gold}, {self.timesave}'


class VS_segment:

    # supply lists of all segments the comparison be based on (all the past splits where at least one was missing should be included)
    def __init__(self, segments):
        you_segments  = [s[0] for s in segments]
        them_segments = [s[1] for s in segments]
        self.you  = you_segments[-1]
        self.them = them_segments[-1]
        self.you_pb    = sum([s.duration.ms for s in you_segments])
        self.them_pb   = sum([s.duration.ms for s in them_segments])
        self.you_gold  = sum([s.gold.ms for s in you_segments])
        self.them_gold = sum([s.gold.ms for s in them_segments])

        self.gold_vs_gold = Duration(self.you_gold - self.them_gold)
        self.pb_vs_pb = Duration(self.you_pb - self.them_pb)
        self.gold_vs_pb = Duration(self.you_gold - self.them_pb)

    def __str__(self):
        return f'{self.you.name}/{self.them.name}, {self.gold_vs_gold}, {self.pb_vs_pb}, {self.gold_vs_pb}, ' \
               f'gold:{Duration(self.you_gold)}/{Duration(self.them_gold)} - pb:{Duration(self.you_pb)}/{Duration(self.them_pb)}'

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
