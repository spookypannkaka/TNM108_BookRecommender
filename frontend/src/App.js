import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import BookList from './components/BookList.js'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Runs when text is typed in (so that the text in the search box updates properly)
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Runs when the Recommend Me button is clicked
  const handleSearchClick = async() => {
    setCurrentSearch(searchTerm);
  };

  // This is needed for the current search to be assigned properly, as the function is too fast otherwise
  useEffect(() => {
    if (currentSearch !== '') {
      handleSearch();
    }
  }, [currentSearch]);

  // This function communicates with the Python/Flask backend. It sends the current search as input and gets info about recommended books back
  const handleSearch = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('userInput', currentSearch);
      const response = await axios.post('http://localhost:5000/search', formData);
  
      setRecommendedBooks(response.data.recommendedBooks);

    } catch (error) {
      console.error('Error:', error.message);

    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="main-container">
      <div className="book-container">

        {/* Left page */}
        <div className="page">
          <h1>The Book Recommender</h1>
          <h3>The story has it that if the reader writes here about what they wish to read in a book, they will get a recommendation that best fits them!</h3>
          <h2>I wish to read a book about...</h2>
          <textarea name="searchForm" value={searchTerm} onChange={handleSearchChange} />
          <button type="submit" onClick={handleSearchClick}>Recommend Me!</button>
        </div>

        {/* Right page */}
        <div className="page">
          {loading ? (
            <h2>Loading...</h2>
          ) : recommendedBooks.length === 0 ? (
            <h2>Your results will be shown on this page!</h2>
          ) : (
            <BookList recommendedBooks={recommendedBooks} />
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
