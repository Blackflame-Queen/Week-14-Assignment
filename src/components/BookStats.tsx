// here we import our dependencies and types
import React from 'react';
import { Book } from '../types/book';

// this defines what props our stats component needs
interface BookStatsProps {
  books: Book[];
}

// here we create our stats component that shows reading metrics
export const BookStats: React.FC<BookStatsProps> = ({ books }) => {
  const totalBooks = books.length;
  const booksRead = books.filter(book => book.isRead).length;
  
  // render our stats in a clean grid layout
  return (
    <div className="book-stats">
      <div className="stat-item">
        <h3>Total Books</h3>
        <p>{totalBooks}</p>
      </div>
      <div className="stat-item">
        <h3>Books Read</h3>
        <p>{booksRead}</p>
      </div>
    </div>
  );
};