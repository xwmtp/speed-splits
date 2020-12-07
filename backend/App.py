from Logger import initalize_logger
from Parse.SplitsIO import parse_splits_io
from Parse.RawData import parse_raw_data
from flask import Flask, request
from flask_cors import CORS
from SplitsData import get_table_data
import logging

initalize_logger()
logger = logging.getLogger('splt.api')

app = Flask(__name__)
CORS(app)


if __name__ == '__main__':
    app.run(debug=True)

@app.route('/', methods=['GET'])
def index():
    return 'Welcome to the SplitsCompare API.'

@app.route('/api/splits/', methods=['GET'])
def splits_data():
    splitsio_id_you  = request.args.get('you_splitsio', '')
    splitsio_id_them = request.args.get('them_splitsio', '')
    rawdata_you  = request.args.get('you_rawdata', '')
    rawdata_them = request.args.get('them_rawdata', '')
    logger.info(request.args)


    if rawdata_you != '':
        you_base_df  = parse_raw_data(rawdata_you)
    else:
        you_base_df  = parse_splits_io(splitsio_id_you)

    if rawdata_them != '':
        them_base_df  = parse_raw_data(rawdata_them)
    else:
        them_base_df  = parse_splits_io(splitsio_id_them)


    if you_base_df is None:
        return {'error': f"Invalid splits.io id '{splitsio_id_you}' for YOU."}
    if them_base_df is None and splitsio_id_them != '':
        return {'error': f"Invalid splits.io id '{splitsio_id_them}' for THEM."}
    return get_table_data(you_base_df, them_base_df)