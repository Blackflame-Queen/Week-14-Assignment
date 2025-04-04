import { Book, BookFormData } from '../types/book';

const API_BASE_URL = 'https://67ec9b2eaa794fb3222e360f.mockapi.io/api/v1';

export const api = {
  // Fetch all books
  async getBooks(): Promise<Book[]> {
    const response = await fetch(`${API_BASE_URL}/books`);
    if (!response.ok) throw new Error('Failed to fetch books');
    return response.json();
  },

  // Create a new book
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

  // Update an existing book
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

  // Delete a book
  async deleteBook(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete book');
  },
};