from SegmentsModels import Segments, Segment, VS_segment

def compareSplits(you, them):
    vs_segments_list = []

    prev_skipped_segments = []
    segments_range = min(len(you.segments), len(them.segments))
    for i in range(segments_range):
        you_segment = you.segments[i]
        them_segment = them.segments[i]
        if you_segment.skipped() or them_segment.skipped():
            prev_skipped_segments.append((you_segment, them_segment))
            vs_segments_list.append(get_empty_vs_segment(you_segment.name, them_segment.name))
        else:
            vs_segments_list.append(VS_segment(prev_skipped_segments + [(you_segment, them_segment)]))
            prev_skipped_segments = []
    return Segments(vs_segments_list)




# create empty vs_segment in case a split of either you or them is missing
def get_empty_vs_segment(name_you, name_them):
    return VS_segment([(Segment(name_you, 0, 0, 0), Segment(name_them, 0, 0, 0))])

