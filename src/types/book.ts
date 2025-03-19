export interface Book {
  id: string;
  title: string;
  author: string;
  isRead: boolean;
  rating?: number;
  genre?: string;
  notes?: string;
  dateAdded: string;
}

export interface BookFormData {
  title: string;
  author: string;
  isRead: boolean;
  rating?: number;
  genre?: string;
  notes?: string;
}