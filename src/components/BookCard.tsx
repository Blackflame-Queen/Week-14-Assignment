// here we import react and our book type
import React from 'react';
import { Book } from '../types/book';

// this defines what props our book card needs to work
interface BookCardProps {
  book: Book;
  onDelete: (id: string) => void;
  onToggleRead: (id: string) => void;
}

// now we create our book card component that shows all the book details
export const BookCard: React.FC<BookCardProps> = ({ book, onDelete, onToggleRead }) => {
  // here we render all the book info and buttons
  return (
    <div className="book-card">
      {book.rating && <div className="book-rating">{"⭐".repeat(book.rating)}</div>}
      <h3 className="book-title">{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Status: {book.isRead ? 'Read' : 'Unread'}</p>
      {book.notes && <p className="book-notes">Notes: {book.notes}</p>}
      
      <div className="book-card-actions">
        {!book.isRead && (
          <button onClick={() => onToggleRead(book.id)}>
            Mark as Read
          </button>
        )}
        <button onClick={() => onDelete(book.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};