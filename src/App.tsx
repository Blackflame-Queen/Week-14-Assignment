import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { BookQuotes } from './components/BookQuotes';
import { Home } from './pages/Home';
import { Books } from './pages/Books';
import { About } from './pages/About';
import { Book } from './types/book';
import { api } from './services/api';
import './App.css';

// here we create our main app component that manages routing and state
function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // render our app with routing and shared state
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>✨ -Archivum- ✨</h1>
          <p className="app-subtitle">Your enchanted digital library</p>
          {isLoading && <div className="loading-spinner">Loading...</div>}
          {error && <div className="error-message">{error}</div>}
          <BookQuotes />
          <Navigation />
        </header>
        <Routes>
          <Route path="/" element={<Home books={books} setBooks={setBooks} />} />
          <Route path="/books" element={<Books books={books} setBooks={setBooks} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
