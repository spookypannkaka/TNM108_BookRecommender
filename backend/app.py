from flask import Flask, request, render_template, jsonify, send_from_directory
from flask_cors import CORS
import json
import gzip
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import heapq

app = Flask(__name__, static_folder="../frontend/build", static_url_path='/')
CORS(app)

# The book recommending function takes in a search query (string) and returns recommended book id:s generated from book reviews
def recommend_books(user_input):
    # Read the dataset containing the book reviews
    file_path = 'goodreads_reviews_poetry.json.gz'

    # Open data in the gz file
    with gzip.open(file_path, mode="rt") as f:
        data = [json.loads(line) for line in f]

    # Create the book_id dictionary that contains all the books
    book_id = {}

    for obj in data:
        id = int(obj.get('book_id'))
        rev = obj.get('review_text')
        
        if id not in book_id:
            book_id[id] = []
            
        book_id[id].append(rev)

    # Sort the book id:s
    sort_book_id = dict(sorted(book_id.items()))

    # Create a dataframe containing info for TD-IDF
    list_book_id = list(sort_book_id.keys())
    df = pd.DataFrame(list_book_id, columns=['book_id']) 

    # Create a list with number of reviews per book
    list_no_rev = [len(key[1]) for key in sort_book_id.items()]
    df['No. of reviews'] = list_no_rev

    # Create a list with the master review document per book
    list_review = [''] * len(sort_book_id) 

    for idx, obj in enumerate(sort_book_id.items()):
        test = obj[1]
        list_review[idx] = [' '.join(test)]

    df['Reviews'] = list_review

    # Insert the user query into the list of master reviews
    list_review.insert(0, [user_input])

    # Convert the list to a tuple for the TF-IDF vectorizer
    tuple_review = tuple(string for sublist in list_review for string in sublist)

    # TF-IDF
    tfidf_vectorizer = TfidfVectorizer(analyzer='word',
                                        min_df=0.0,
                                        stop_words=list(set(stopwords.words('english'))))

    tfidf_matrix = tfidf_vectorizer.fit_transform(tuple_review)

    # Cosine similarity
    cos_similarity = cosine_similarity(tfidf_matrix[0], tfidf_matrix)

    # Find the top 5 values in the cosine similarity
    top_sim = heapq.nlargest(6, cos_similarity[0])

    # Find the indexes for the top 5 values
    indices_values_dict = {index: value for index, value in enumerate(cos_similarity[0])}

    indices_top_5_max = [index-1 for index, value in sorted(indices_values_dict.items(), 
                     key=lambda item: item[1], reverse=True) if value in top_sim]
    
    # Find the book ids for the top values
    rec_book_id = [None] * (len(indices_top_5_max)-1)

    for i in range(1, len(indices_top_5_max)):
        rec_book_id[i-1] = int(df.iloc[indices_top_5_max[i]]['book_id'])

    # Return the 5 suggested book ids
    return rec_book_id

# Fetches info about the recommended books through their book id:s
def fetch_book_info(id_list):
    # Read the dataset containing the book reviews
    file_path = 'goodreads_books_poetry.json.gz'

    with gzip.open(file_path, mode="rt") as f:
        data = [json.loads(line) for line in f]

    # Create a dictionary to store book information
    book_info = {}

    # Iterate through the data and extract information for the given book ids
    for book in data:
        if int(book.get('book_id')) in id_list:
            book_info[int(book.get('book_id'))] = {
                'title': book.get('title'),
                'description': book.get('description'),
                'average_rating': book.get('average_rating'),
                'image_url': book.get('image_url'),
                'link': book.get('link'),
                'publication_year': book.get('publication_year'),
            }

    return book_info

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/search', methods=['POST'])
def search():
    try:
        user_input = request.form.get('userInput')
        print('Request Data:', request.get_data(as_text=True))

        if not user_input:
            return jsonify({'error': 'Invalid input'})

        recommended_books = recommend_books(user_input)
        book_info = fetch_book_info(recommended_books)

        return jsonify({'recommendedBooks': book_info})
    except Exception as e:
        print(f"Error in search route: {e}")
        return jsonify({'error': 'Internal server error'})



if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
