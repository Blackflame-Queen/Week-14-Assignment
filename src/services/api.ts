import { Book, BookFormData } from '../types/book';

// this is the link for my MockAPI resource
const API_BASE_URL = 'https://67ec9b2eaa794fb3222e360f.mockapi.io/api/v1';

export const api = {
  // a promise here retrieves the complete list of books from the database
  async getBooks(): Promise<Book[]> {
    const response = await fetch(`${API_BASE_URL}/books`);
    if (!response.ok) throw new Error('Failed to fetch books');
    return response.json();
  },

  // saves a new book entry to the database with a timestamp
  async createBook(bookData: BookFormData): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...bookData,
        dateAdded: new Date().toISOString(),
      }),
    });
    if (!response.ok) throw new Error('Failed to create book');
    return response.json();
  },

  // this modifies an existing book's information in the database
  async updateBook(id: string, bookData: Partial<Book>): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) throw new Error('Failed to update book');
    return response.json();
  },

  // removes a book entry from the database permanently
  async deleteBook(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete book');
  },
};