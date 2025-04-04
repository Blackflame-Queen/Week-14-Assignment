import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { BookQuotes } from './components/BookQuotes';
import { Home } from './pages/Home';
import { Books } from './pages/Books';
import { About } from './pages/About';
import { Book } from './types/book';
import './App.css';

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>✨ -Archivum- ✨</h1>
          <p className="app-subtitle">Your enchanted digital library</p>
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
