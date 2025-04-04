// here we import our dependencies and styles
import React, { useState, useEffect } from 'react';
import './BookQuotes.css';

// here is a collection of literary quotes to enhance the experience
const quotes = [
  {
    text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
    author: "George R.R. Martin"
  },
  {
    text: "Books are a uniquely portable magic.",
    author: "Stephen King"
  },
  {
    text: "There is no friend as loyal as a book.",
    author: "Ernest Hemingway"
  },
  {
    text: "That's the thing about books. They let you travel without moving your feet.",
    author: "Jhumpa Lahiri"
  },
  {
    text: "Reading is to the mind what exercise is to the body.",
    author: "Joseph Addison"
  }
];

// this creates our quotes component that displays rotating book quotes
export const BookQuotes: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  // render our quote with author attribution
  return (
    <div className="book-quotes">
      <blockquote>
        <p>"{currentQuote.text}"</p>
        <footer>— {currentQuote.author}</footer>
      </blockquote>
    </div>
  );
};