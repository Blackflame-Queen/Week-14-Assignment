import React, { useState, useEffect } from 'react';
import { Book, BookFormData } from '../types/book';
import { BookCard } from './BookCard';
import { BookForm } from './BookForm';
import { api } from '../services/api';

// here is our main book list component that manages all books
interface BookListProps {
  showForm?: boolean;
}

export const BookList: React.FC<BookListProps> = ({ showForm = false }) => {
  // State management for books, loading, error, and form visibility
  const [books, setBooks] = useState<Book[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch books when component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await api.getBooks();
        setBooks(fetchedBooks);
        setError(null);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Handle submitting new books
  const handleSubmit = async (data: BookFormData) => {
    try {
      setIsLoading(true);
      const newBook = await api.createBook(data);
      setBooks(prev => [...prev, newBook]);
      setError(null);
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error adding book:', error);
      setError('Failed to add book. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle book deletion
  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await api.deleteBook(id);
      setBooks(prev => prev.filter(book => book.id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting book:', error);
      setError('Failed to delete book. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle toggling book read status
  const handleToggleRead = async (id: string) => {
    try {
      const book = books.find(b => b.id === id);
      if (!book) return;
      
      setIsLoading(true);
      const updatedBook = await api.updateBook(id, { isRead: !book.isRead });
      setBooks(prev =>
        prev.map(b => b.id === id ? updatedBook : b)
      );
      setError(null);
    } catch (error) {
      console.error('Error updating book:', error);
      setError('Failed to update book status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="book-list">
      <div className="book-list-header">
        <h2>My Bookshelf</h2>
        {showForm && (
          <button 
            onClick={() => setIsFormVisible(true)} 
            disabled={isLoading}
          >
            Add New Book
          </button>
        )}
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {isLoading && <div className="loading-spinner">Loading...</div>}

      {showForm && isFormVisible && (
        <BookForm
          onSubmit={handleSubmit}
          onCancel={() => setIsFormVisible(false)}
        />
      )}

      <div className="book-grid">
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onDelete={handleDelete}
            onToggleRead={handleToggleRead}
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
