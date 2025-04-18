import React, { useState, useEffect } from 'react';
import { Book, BookFormData } from '../types/book';
import { StarRating } from './StarRating';

// this defines what props our form component needs
interface BookFormProps {
  book?: Book;
  onSubmit: (data: BookFormData) => void;
  onCancel: () => void;
}

// here we create our form component that handles adding and editing books
export const BookForm: React.FC<BookFormProps> = ({ book, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    isRead: false,
    rating: undefined,
    genre: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const genres = [
    'Fiction',
    'Non-Fiction',
    'Young Adult',
    'Fantasy',
    'Romance',
    'Mystery',
    'Thriller',
    'Dystopian',
    'Classic Literature',
    'Horror',
    'Sci-Fi',
    'Historical'
  ];

  // now we update the form when editing an existing book
  useEffect(() => {
    if (book) setFormData({ ...book });
  }, [book]);

  // this handles changes to any form field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(formData);
      setFormData({
        title: '',
        author: '',
        isRead: false,
        rating: undefined,
        genre: '',
        notes: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the form');
    } finally {
      setIsSubmitting(false);
    }
  };

  // finally, we render our form with all its input fields
  return (
    <form onSubmit={handleSubmit} className="book-form">
      <div className="form-group">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book Title *"
          required
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author *"
          required
        />
      </div>

      <div className="form-group">
        <select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="genre-select"
          required
        >
          <option value="">Genre *</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="isRead"
            checked={formData.isRead}
            onChange={handleChange}
          />
          I have read this book
        </label>
      </div>

      <div className="form-group">
        <StarRating
          rating={formData.rating}
          onRatingChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
        />
      </div>

      <div className="form-actions">
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : (book ? 'Update' : 'Summon')}
        </button>
        <button type="button" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </button>
      </div>
    </form>
  );
};