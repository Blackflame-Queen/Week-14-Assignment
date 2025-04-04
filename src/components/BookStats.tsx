import React from 'react';
import { Book } from '../types/book';

interface BookStatsProps {
  books: Book[];
}

export const BookStats: React.FC<BookStatsProps> = ({ books }) => {
  const totalBooks = books.length;
  const booksRead = books.filter(book => book.isRead).length;
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