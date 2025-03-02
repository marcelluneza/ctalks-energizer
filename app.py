from flask import Flask, render_template, jsonify, request
import requests, nltk
from nltk.corpus import stopwords

from bs4 import BeautifulSoup
import re
from collections import Counter

app = Flask(__name__)

# Define a function to run when the button is pressed
def fetch_page(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"Error fetching the page: {e}")
        return None

def count_words(text):
    stop_words = stopwords.words('english')
    words = re.findall(r'\b[a-zA-Z]+\b', text.lower())  # Extract words
    significant_words = [word for word in words if word not in stop_words]
    word_count = Counter(significant_words)  
    return word_count

def get_family_feud(url):
    html_content = fetch_page(url)
    if html_content:
        soup = BeautifulSoup(html_content, 'html.parser')

        text = soup.get_text()
        word_count = count_words(text)
        
        for word, count in word_count.most_common(20):
            print(f"{word}: {count}")

        most_common_words = word_count.most_common(20)
        print(dict(most_common_words))
        return dict(most_common_words)

    return "No value detected!"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/run_code', methods=['GET'])
def execute_code():
    input_data = request.args.get('inputData')
    print("HEREEEEEE\n\n:", input_data)
    result = get_family_feud(input_data)  # Run your Python code
    # return jsonify(result=result)  # Return result as JSON response
    return render_template('result.html', word_data=result)


if __name__ == '__main__':
    app.run(debug=True)
