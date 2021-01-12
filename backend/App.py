from Logger import initalize_logger
from Parse.SplitsIO import parse_splits_io
from Parse.RawData import parse_raw_data
from flask import Flask, request, send_from_directory
from flask_cors import CORS
from SplitsData import get_table_data
import logging
import os

initalize_logger()
logger = logging.getLogger('splt.api')

app = Flask(__name__, static_folder='../frontend/build')
CORS(app)

if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True, debug=True)

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/', methods=['GET'])
def index():
    return 'Welcome to the SplitsCompare API.'

@app.route('/api/splits/', methods=['GET'])
def splitsio_endpoint():
    splitsio_id_you = request.args.get('you_splitsio', '')
    splitsio_id_them = request.args.get('them_splitsio', '')
    you_base_df = parse_splits_io(splitsio_id_you)
    them_base_df = parse_splits_io(splitsio_id_them)

    if you_base_df is None:
        return {'error': f"Invalid splits.io id '{splitsio_id_you}' for YOU."}
    if them_base_df is None and splitsio_id_them != '':
        return {'error': f"Invalid splits.io id '{splitsio_id_them}' for THEM."}

    return get_table_data(you_base_df, them_base_df)

@app.route('/api/splits/form/', methods=['POST'])
def splits_form_endpoint():
    data = request.json
    splitsio_id_you = data['you']['splitsio'].strip()
    splitsio_id_them = data['them']['splitsio'].strip()
    rawdata_you  = data['you']['rawdata']
    rawdata_them = data['them']['rawdata']

    you_data = {}
    them_data = {}

    if splitsio_id_you != '':
        you_data = parse_splits_io(splitsio_id_you)
    if rawdata_you != '':
        you_data  = parse_raw_data(rawdata_you)

    if not you_data:
        return {'error': "No run data submitted for 'YOU', which is required."}
    if 'error' in you_data:
        return {'error' : you_data['error']  + " (for 'YOU')."}

    if splitsio_id_them != '':
        them_data = parse_splits_io(splitsio_id_them)
    if rawdata_them != '':
        them_data = parse_raw_data(rawdata_them)

    if 'error' in them_data:
        return {'error' : them_data['error'] + " (for 'THEM')."}

    you_base_df = you_data['df']
    them_base_df = them_data['df'] if 'df' in them_data else None

    table_data = get_table_data(you_base_df, them_base_df)
    if table_data is None:
        return {'error': f"Error while constructing data table, please verify submitted data and see 'FAQ'."}
    else:
        return table_data
