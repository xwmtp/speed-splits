from Logger import initalize_logger
from flask import Flask, request, jsonify
import SplitsData

initalize_logger()

app = Flask(__name__)


if __name__ == '__main__':
    app.run()

@app.route('/', methods=['GET'])
def index():
    return 'Welcome to the SplitsCompare API.'

@app.route('/data/splits/', methods=['GET'])
def splits_data():
    splitsio_id = request.args['splitsio']
    data = SplitsData.get_splitsio_data(splitsio_id)
    print(data)
    return jsonify(data)