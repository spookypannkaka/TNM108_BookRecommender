import React from 'react';

const BookCard = ({ book }) => {
  // Limit description length so that long descriptions stay in their containers
  const truncatedDescription = book.description.slice(0, 600);

  return (
    <div style={mainContainer}>
      <div>
        <img src={book.image_url} style={imageStyle} alt={`${book.title} Cover`} />
      </div>
      <div style={contentContainer}>
        <h2 style={{font: 'bold 1.2rem Georgia', margin: '0', marginBottom: '0.2rem'}}>{book.title.toUpperCase()} ({book.publication_year ? (book.publication_year) : '????'})</h2>
        <p style={{font: 'italic 0.8rem Georgia', margin: '0', marginBottom: '0.2rem'}}>Average rating: {book.average_rating}</p>
        <p style={{font: '0.7rem Georgia'}}>{truncatedDescription}</p>
        <a style={{font: '0.8rem Georgia'}} href={book.link}>Read more about this book</a>
      </div>
    </div>
  );
}

const mainContainer = {
  backgroundColor: '#d9c1b4',
  height: '250px',
  width: '90%',
  margin: 'auto',
  border: '0.5rem outset #8c593b',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px 10px',
  padding: '1rem'
};

const contentContainer = {
  margin: '0',
  letterSpacing: 'normal',
}

const imageStyle = {
  float: 'left',
  width: 120,
  height: 180,
}

export default BookCard;
