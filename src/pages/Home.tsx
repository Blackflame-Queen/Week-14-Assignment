import { useState } from 'react';
import { BookForm } from '../components/BookForm';
import { Book } from '../types/book';

interface HomeProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

type BookFormData = Omit<Book, 'id' | 'dateAdded'>;

export function Home({ setBooks }: HomeProps) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = (data: BookFormData) => {
    const newBook: Book = {
      ...data,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString()
    };
    setBooks(prev => [...prev, newBook]);
    setIsFormVisible(false);
  };

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