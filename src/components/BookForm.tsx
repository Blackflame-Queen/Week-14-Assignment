import React, { useState, useEffect } from 'react';
import { Book, BookFormData } from '../types/book';

// this defines what props our form component needs
interface BookFormProps {
  book?: Book;
  onSubmit: (data: BookFormData) => void;
  onCancel: () => void;
}

// here we create our form component that handles adding and editing books
export const BookForm: React.FC<BookFormProps> = ({ book, onSubmit, onCancel }) => {
  // next, this sets up our form's initial state
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    isRead: false,
    rating: undefined,
    genre: '' //coming soon
  });

  // now we update the form when editing an existing book
  useEffect(() => {
    if (book) setFormData({ ...book });
  }, [book]);

  // this handles changes to any form field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // finally, we render our form with all its input fields
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="book-form">
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
        <label>
          <input
            type="checkbox"
            name="isRead"
            checked={formData.isRead}
            onChange={handleChange}
          />
          I read this book
        </label>
        {formData.isRead && (
          <input
            type="number"
            name="rating"
            value={formData.rating || ''}
            onChange={handleChange}
            placeholder="Rating (1-5)"
            min="1"
            max="5"
          />
        )}
      </div>

      <div className="form-actions">
        <button type="submit">{book ? 'Update' : 'Add'} Book</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};