from Logger import initalize_logger
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import SplitsData
import json

initalize_logger()

app = Flask(__name__)
CORS(app)


if __name__ == '__main__':
    app.run()

@app.route('/', methods=['GET'])
def index():
    return 'Welcome to the SplitsCompare API.'

@app.route('/api/splits/', methods=['GET'])
def splits_data():
    splitsio_you_id  = request.args['you_splitsio']
    try:
        splitsio_them_id = request.args['them_splitsio']
    except KeyError:
        splitsio_them_id = None
    data = SplitsData.get_splitsio_data(splitsio_you_id, splitsio_them_id)
    return data