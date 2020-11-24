from Logger import initalize_logger
from SplitParse.SplitsIO import parse_splits_io
from CompareSplits import compareSplits
from Segment import VS_segment

initalize_logger()


you_segments = parse_splits_io('4uio')
them_segments = parse_splits_io('4tbx')

#def get_vs_segments(you_segments, them_segments):
#    segments_range = min(len(you_segments), len(them_segments))
#    return [VS_segment(you_segments[i], them_segments[i]) for i in range (segments_range)]


for segment in you_segments:
    print(segment)
print()
for segment in them_segments:
    print(segment)
print()
print('name/name gold_vs_gold, pb_vs_pb, gold_vs_pb')
for segment in compareSplits(you_segments, them_segments):
    print(segment)
print()