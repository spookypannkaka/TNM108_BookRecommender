import React from 'react';
import BookCard from './BookCard';

const BookList = ({ recommendedBooks  }) => {
  return (
    <div style={containerStyle}>
      <h2>The best recommendations for you is...</h2>
      {recommendedBooks && Object.values(recommendedBooks).map((book) => (
        <BookCard book={book} />
      ))}
    </div>
  );
};

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px 0px',
}

export default BookList;