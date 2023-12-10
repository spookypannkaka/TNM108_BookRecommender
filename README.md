# The Book Recommender
A recommender system for books for the machine learning course TNM108, made by Alice Swanberg Roscher, Cindy Truong and Lovisa Svensson. It uses Python, React and Flask.

## How it works
The user can write a description on the left page describing a book they would like to read. Clicking the Recommend Me button then processes the prompt and provides a list of 5 recommended book on the right.

The system processes the reviews for the books in the backend through TF-IDF and cosine similarity and matches them to the input string of text from the frontend to find the most common words between them.

## The dataset
We have used the Goodsreads Dataset from here:
[https://mengtingwan.github.io/data/goodreads.html](https://mengtingwan.github.io/data/goodreads.html#datasets).

The data for this project is split into two files: a file containing all the book reviews for a genre, and a file containing all the book information for a genre. We implemented the smallest set of books for this project, which is the poetry genre. It is included in this repository.

If you would like to try with another dataset from this link, you can replace the two file_path variables in app.py with another set of books and reviews, provided that you have downloaded them and put them in the backend directory. Use the .gz files as they are downloaded, do not decompress them.

## How to run
Go to the backend directory and run "python app.py".
