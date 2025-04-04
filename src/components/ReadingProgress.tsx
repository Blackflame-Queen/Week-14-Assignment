// here we import our dependencies and types
import React from 'react';
import { Book } from '../types/book';

// this defines what props our progress component needs
interface ReadingProgressProps {
  books: Book[];
  readingGoal?: number;
}

// here we create our progress component that tracks reading goal
export const ReadingProgress: React.FC<ReadingProgressProps> = ({ 
  books,
  readingGoal = 50 
}) => {
  const booksRead = books.filter(book => book.isRead).length;
  const progressPercentage = Math.min((booksRead / readingGoal) * 100, 100);

  // render our progress bar and completion status
  return (
    <div className="reading-progress">
      <h3>Reading Goal Progress</h3>
      <div className="goal-progress">
        <div 
          className="progress-bar"
          style={{
            '--progress': `${progressPercentage}%`
          } as React.CSSProperties}
        >
          <div className="progress-fill" />
        </div>
        <p className="books-read-text">{booksRead} of {readingGoal} books read</p>
      </div>
      {progressPercentage >= 100 && (
        <div className="goal-achieved">
          <span>🎉</span>
          <p>-Congrats: you've read 50 books-</p>
        </div>
      )}
    </div>
  );
};