import os

import nltk
from sklearn.externals import joblib

from flask_cors import CORS

from flask import Flask, request, jsonify, render_template

CURRENT_DIR = os.path.dirname(__file__)
model_file = os.path.join(CURRENT_DIR, 'model.file')
model = joblib.load(model_file)

app = Flask(__name__)
cors = CORS(app)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    review = request.json['review']
    print(review)
    label = model.predict([review])
    result = 'Positive' if label[0] == 1 else 'Negative'
    return result


if __name__ == "__main__":
    app.run(debug=True)
