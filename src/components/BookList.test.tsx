import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BookList } from './BookList';
import { api } from '../services/api';
import { Book } from '../types/book';

// Mock the API module
jest.mock('../services/api');
const mockedApi = api as jest.Mocked<typeof api>;

// Sample test data
const testBooks: Book[] = [
  {
    id: '1',
    title: 'Test Book 1',
    author: 'Author 1',
    notes: 'Description 1',
    rating: 4,
    isRead: false,
    dateAdded: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Test Book 2',
    author: 'Author 2',
    notes: 'Description 2',
    rating: 5,
    isRead: true,
    dateAdded: new Date().toISOString()
  }
];

describe('BookList Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should fetch and display books on mount', async () => {
    // Mock the API response
    mockedApi.getBooks.mockResolvedValueOnce(testBooks);

    render(<BookList />);

    // Should show loading state initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for books to be displayed
    await waitFor(() => {
      expect(screen.getByText('Test Book 1')).toBeInTheDocument();
      expect(screen.getByText('Test Book 2')).toBeInTheDocument();
    });

    // Loading spinner should be gone
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('should handle API errors when fetching books', async () => {
    // Mock API error
    mockedApi.getBooks.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<BookList />);

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch books. Please try again later.')).toBeInTheDocument();
    });
  });

  it('should add a new book successfully', async () => {
    const newBook = {
      id: '3',
      title: 'New Book',
      author: 'New Author',
      notes: 'New Description',
      rating: 3,
      isRead: false,
      dateAdded: new Date().toISOString()
    };

    mockedApi.getBooks.mockResolvedValueOnce([]);
    mockedApi.createBook.mockResolvedValueOnce(newBook);

    render(<BookList showForm={true} />);

    // Click add book button
    fireEvent.click(screen.getByText('Add New Book'));

    // Fill form and submit (assuming BookForm component is properly integrated)
    // Add form submission test logic here

    // Verify the new book is added
    await waitFor(() => {
      expect(mockedApi.createBook).toHaveBeenCalled();
    });
  });

  it('should delete a book successfully', async () => {
    mockedApi.getBooks.mockResolvedValueOnce(testBooks);
    mockedApi.deleteBook.mockResolvedValueOnce(undefined);

    render(<BookList />);

    // Wait for books to load
    await waitFor(() => {
      expect(screen.getByText('Test Book 1')).toBeInTheDocument();
    });

    // Find and click delete button (assuming it exists in BookCard)
    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    fireEvent.click(deleteButton);

    // Verify the book is deleted
    await waitFor(() => {
      expect(mockedApi.deleteBook).toHaveBeenCalledWith('1');
    });
  });

  it('should toggle read status successfully', async () => {
    mockedApi.getBooks.mockResolvedValueOnce(testBooks);
    mockedApi.updateBook.mockResolvedValueOnce({
      ...testBooks[0],
      isRead: true
    });

    render(<BookList />);

    // Wait for books to load
    await waitFor(() => {
      expect(screen.getByText('Test Book 1')).toBeInTheDocument();
    });

    // Find and click toggle read button (assuming it exists in BookCard)
    const toggleButton = screen.getAllByRole('button', { name: /toggle read/i })[0];
    fireEvent.click(toggleButton);

    // Verify the book status is updated
    await waitFor(() => {
      expect(mockedApi.updateBook).toHaveBeenCalledWith('1', { isRead: true });
    });
  });

  it('should handle errors when adding a book', async () => {
    mockedApi.getBooks.mockResolvedValueOnce([]);
    mockedApi.createBook.mockRejectedValueOnce(new Error('Failed to add book'));

    render(<BookList showForm={true} />);

    // Click add book button
    fireEvent.click(screen.getByText('Add New Book'));

    // Attempt to add book (assuming BookForm component is properly integrated)
    // Add form submission test logic here

    // Verify error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Failed to add book. Please try again.')).toBeInTheDocument();
    });
  });
});