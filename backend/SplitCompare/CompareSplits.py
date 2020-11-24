from Segment import Segment, VS_segment

def compareSplits(you_segments, them_segments):
    vs_segments = []

    prev_skipped_segments = []
    segments_range = min(len(you_segments), len(them_segments))
    for i in range(segments_range):
        you_segment = you_segments[i]
        them_segment = them_segments[i]
        if you_segment.skipped() or them_segment.skipped():
            prev_skipped_segments.append((you_segment, them_segment))
            vs_segments.append(get_empty_vs_segment(you_segment.name, them_segment.name))
        else:
            vs_segments.append(VS_segment(prev_skipped_segments + [(you_segment, them_segment)]))
            prev_skipped_segments = []
    return vs_segments




# create empty vs_segment in case a split of either you or them is missing
def get_empty_vs_segment(name_you, name_them):
    return VS_segment([(Segment(name_you, 0, 0, 0), Segment(name_them, 0, 0, 0))])

