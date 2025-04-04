import React from 'react';

// defines the sorting options for the book list
export type SortOption = 'title' | 'author' | 'rating';

// component props for handling sort operations
interface SortingControlsProps {
  onSort: (sortBy: SortOption) => void;
  currentSort: SortOption;
}

export const SortingControls: React.FC<SortingControlsProps> = ({ 
  onSort,
  currentSort 
}) => {
  return (
    <div className="sorting-controls">
      <label htmlFor="sort-select">Sort by: </label>
      <select
        id="sort-select"
        value={currentSort}
        onChange={(e) => onSort(e.target.value as SortOption)}
        className="sort-select"
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
};