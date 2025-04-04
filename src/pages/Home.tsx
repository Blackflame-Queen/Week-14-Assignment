// here we import our dependencies and components
import { useState } from 'react';
import { BookForm } from '../components/BookForm';
import { Book } from '../types/book';
import { api } from '../services/api';

// this defines what props our home page needs
interface HomeProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

// here we define our book form data type
type BookFormData = Omit<Book, 'id' | 'dateAdded'>;

// here we create our home page component that handles new book creation
export function Home({ setBooks }: HomeProps) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  // handle submitting new books
  const handleSubmit = async (data: BookFormData) => {
    try {
      const newBook = await api.createBook(data);
      setBooks(prev => [...prev, newBook]);
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  };

  // render our home page with book creation form
  return (
    <div className="home-page">
      <main className="app-main">
        <h2>Summon a New Book</h2>
        <p className="welcome-message">Welcome to the Archivum, Summon a new book to appear on your bookshelf.</p>
        {!isFormVisible ? (
          <button onClick={() => setIsFormVisible(true)}>New Book</button>
        ) : (
          <BookForm
            onSubmit={handleSubmit}
            onCancel={() => setIsFormVisible(false)}
          />
        )}
      </main>
    </div>
  );
}