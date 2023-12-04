import React, { useState } from 'react';
import './App.css';
import './OpenBook.css';

import BookList from './components/BookList.js'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    setCurrentSearch(searchTerm);
  };


  return (
    <div className="main-container">
      <div className="book-container">
        <div className="page">
          <h1>The Book Recommender</h1>
          <h3>The story has it that if the reader writes here about what they wish to read in a book, they will get a recommendation that best fits them!</h3>
          <h2>I wish to read about...</h2>
          <textarea name="searchForm" value={searchTerm} onChange={handleSearchChange} />
          <button type="submit" onClick={handleSearchClick}>Recommend Me!</button>
        </div>
        <div className="page">
          <BookList searchTerm={currentSearch}/>
        </div>
        </div>
    </div>
  );
}

export default App;
