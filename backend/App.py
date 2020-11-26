from Logger import initalize_logger
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import SplitsData

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
    splitsio_id = request.args['you_splitsio']
    data = SplitsData.get_splitsio_data(splitsio_id)
    print(data)
    return jsonify(data)