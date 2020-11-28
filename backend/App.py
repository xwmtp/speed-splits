from Logger import initalize_logger
from Parse.SplitsIO import parse_splits_io
from flask import Flask, request
from flask_cors import CORS
from SplitsData import get_table_data
import json
import logging

initalize_logger()
logger = logging.getLogger('splt.api')

app = Flask(__name__)
CORS(app)


if __name__ == '__main__':
    app.run()

@app.route('/', methods=['GET'])
def index():
    return 'Welcome to the SplitsCompare API.'

@app.route('/api/splits/', methods=['GET'])
def splits_data():
    splitsio_you_id  = request.args.get('you_splitsio', '')
    splitsio_them_id = request.args.get('them_splitsio', '')
    logger.info(request.args)

    you_base_df = parse_splits_io(splitsio_you_id)
    them_base_df = parse_splits_io(splitsio_them_id)

    if you_base_df is None:
        return {'error': f"Invalid splits.io id '{splitsio_you_id}' for YOU."}
    if them_base_df is None and splitsio_them_id != '':
        return {'error': f"Invalid splits.io id '{splitsio_them_id}' for THEM."}
    return get_table_data(you_base_df, them_base_df)