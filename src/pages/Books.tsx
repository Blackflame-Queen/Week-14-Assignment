import { BookCard } from '../components/BookCard';
import { Book } from '../types/book';

interface BooksProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

export function Books({ books, setBooks }: BooksProps) {
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

  return (
    <div className="books-page">
      <div className="books-content">
        <h2>My Bookshelf</h2>
        <p className="books-description">
          Add books from the home page and manage your collection here.
        </p>
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
    </div>
  );
}