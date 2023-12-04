import React, { useState, useEffect } from 'react';

const BookCard = ({ book }) => {

  return (
    <div style={mainContainer}>
      <div style={imageContainer}>
        <img src={book.cover_image} style={imageStyle} alt={`${book.title} Cover`} />
      </div>
      <div style={contentContainer}>
        <h2 style={{font: 'bold 1.8rem Georgia', margin: '0', marginBottom: '0.2rem'}}>{book.title.toUpperCase()}</h2>
        <p style={{font: 'italic 1.2rem Georgia', margin: '0', marginBottom: '0.2rem'}}>{book.author}, {book.release_year}</p>
        <p style={{font: '0.8rem Georgia', margin: '0', marginBottom: '0.2rem'}}>Genre: {book.genres.join(', ')}</p>
        <p style={{font: '1rem Georgia'}}>{book.description}</p>
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

const imageContainer = {
  //backgroundColor: 'yellow'
}

const contentContainer = {
  //backgroundColor: 'blue',
  margin: '0',
  letterSpacing: 'normal',
}

const imageStyle = {
  float: 'left',
  width: 120,
  height: 180,
}

export default BookCard;
