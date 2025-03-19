import React, { useState } from 'react';
import { Book, BookFormData } from '../types/book';
import { BookCard } from './BookCard';
import { BookForm } from './BookForm';

// here is our main book list component that manages all books
export const BookList: React.FC = () => {
  // we set up our state to keep track of books and form visibility
  const [books, setBooks] = useState<Book[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>();

  // this handles submitting new books and updating existing ones
  const handleSubmit = (data: BookFormData) => {
    if (editingBook) {
      setBooks(prev =>
        prev.map(book => book.id === editingBook.id ? { ...editingBook, ...data } : book)
      );
      setEditingBook(undefined);
    } else {
      const newBook: Book = {
        ...data,
        id: Date.now().toString(),
        dateAdded: new Date().toISOString()
      };
      setBooks(prev => [...prev, newBook]);
    }
    setIsFormVisible(false);
  };

  // we handle editing a book by setting up the form
  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setIsFormVisible(true);
  };

  // this lets me remove a book from the collection
  const handleDelete = (id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  // here we toggle whether a book has been read or not
  const handleToggleRead = (id: string) => {
    setBooks(prev =>
      prev.map(book =>
        book.id === id ? { ...book, isRead: !book.isRead } : book
      )
    );
  };

  // finally we render our book list with all its features
  return (
    <div className="book-list">
      <div className="book-list-header">
        <h2>My Bookshelf</h2>
        <button onClick={() => setIsFormVisible(true)}>Add New Book</button>
      </div>

      {isFormVisible && (
        <BookForm
          book={editingBook}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormVisible(false);
            setEditingBook(undefined);
          }}
        />
      )}

      <div className="book-grid">
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onDelete={handleDelete}
            onToggleRead={handleToggleRead}
            onEdit={handleEdit}
          />
        ))}      
      </div>

      {books.length === 0 && (
        <p className="no-books-message">
          Nothing but dust on the shelf...
        </p>
      )}
    </div>
  );
};
