// here we import our styles, the book list component and the book card and book form it carries
import { BookList } from './components/BookList';
import './App.css';

// this is our main app component that wraps everything together
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>✨ -Archivum- ✨</h1>
        <p className="app-subtitle">Your enchanted library</p>
      </header>
      <main className="app-main">
        <BookList />
      </main>
    </div>
  );
}

export default App;
