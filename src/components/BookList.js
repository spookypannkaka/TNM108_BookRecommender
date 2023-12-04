import React from 'react';
import BookCard from './BookCard';
import booksData from '../data/examplebooks.json';

const BookList = ({ searchTerm }) => {
    const filteredBooks = booksData.books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div style={containerStyle}>
        <h2>Our best recommendation to you is...</h2>
      {filteredBooks.slice(0,1).map((book, index) => (
        <BookCard key={index} book={book} />
      ))}

        <h3>We also recommend...</h3>
        {filteredBooks.slice(2,4).map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
  );
};

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px 0px'
}

export default BookList;
