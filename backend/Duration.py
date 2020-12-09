import math
import numpy as np

class Duration:
    def __init__(self, ms):
        self.nan = np.isnan(ms)
        if not self.nan:
            self.negative = ms < 0
            ms = abs(int(ms))
            self.total_ms = ms
            self.hours, rest = divmod(ms, 1000 * 60 * 60)
            self.minutes, rest = divmod(rest, 1000 * 60)
            self.seconds, rest = divmod(rest, 1000)
            self.milliseconds = rest

    def to_string_rounded(self, magnitude=1):
        if not self.nan:
            total_seconds_and_decimals = round(self.total_ms / 1000, magnitude)
            hours, rest = divmod(math.floor(total_seconds_and_decimals), 60 * 60)
            minutes, rest = divmod(rest, 60)
            seconds = rest
            decimals = int(round(total_seconds_and_decimals % 1, magnitude) * 10 ** (magnitude))
            return self.time_to_string(hours, minutes, seconds, decimals, magnitude, self.negative)
        else:
            return ''

    def __str__(self):
        if not self.nan:
            return self.time_to_string(self.hours, self.minutes, self.seconds, self.milliseconds, 3, self.negative)
        else:
            return ''

    def time_to_string(self, hours, minutes, seconds, decimals, magnitude, negative=False):
        if negative and (hours != 0 or minutes != 0 or seconds != 0 or decimals != 0):
            sign = '-'
        else:
            sign = ''
        f_hours = f'{hours}:' if hours > 0 else ''
        f_minutes = f'{minutes}:' if hours > 0 or minutes > 0 else ''
        if minutes < 10 and f_hours != '':
            f_minutes = f'0{f_minutes}'
        f_seconds = f'0{seconds}' if seconds < 10 and f_minutes != '' else seconds
        f_decimals = f"{'0' * (magnitude - len(str(decimals)))}{decimals}"
        return f"{sign}{f_hours}{f_minutes}{f_seconds}.{f_decimals}"