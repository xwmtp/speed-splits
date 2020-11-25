
from Parse.SplitsIO import parse_splits_io


def get_splitsio_data(id):
    segments = parse_splits_io(id)
    return segments.to_data()

