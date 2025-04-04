import { useState } from 'react';
import { BookCard } from '../components/BookCard';
import { Book } from '../types/book';
import { SearchBar } from '../components/SearchBar';
import { SortingControls } from '../components/SortingControls';
import { BookStats } from '../components/BookStats';
import { ReadingProgress } from '../components/ReadingProgress';

// this says what props our books page needs
interface BooksProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

// now we create our books page component that manages the book collection
export function Books({ books, setBooks }: BooksProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'author' | 'rating'>('title');

  const handleDelete = (id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  const handleToggleRead = (id: string) => {
    setBooks(prev =>
      prev.map(book =>
        book.id === id ? { ...book, isRead: !book.isRead } : book
      )
    );
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return a[sortBy].localeCompare(b[sortBy]);
  });

  // render our books page with all its components
  return (
    <div className="books-page">
      <div className="books-content">
        <h2>My Bookshelf</h2>
        <div className="book-list-header">
          <SearchBar onSearch={setSearchQuery} />
          <SortingControls onSort={setSortBy} currentSort={sortBy} />
        </div>
        <div className="stats-container">
          <BookStats books={books} />
          <ReadingProgress books={books} />
        </div>
        <div className="book-grid">
          {sortedBooks.map(book => (
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
    </div>
  );
}