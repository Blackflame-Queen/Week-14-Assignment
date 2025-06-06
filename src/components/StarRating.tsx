import React, { useState } from 'react';

// component props interface for handling star rating interactions
interface StarRatingProps {
  rating: number | undefined;
  onRatingChange: (rating: number) => void;
}

// interactive star rating component that displays and handles rating changes
export const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleMouseEnter = (starIndex: number) => {
    setHoverRating(starIndex);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleClick = (starIndex: number) => {
    onRatingChange(starIndex);
  };

  return (
    <div className="star-rating" onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <span
          key={starIndex}
          className={`star ${(hoverRating !== null ? starIndex <= hoverRating : starIndex <= (rating || 0)) ? 'filled' : ''}`}
          onMouseEnter={() => handleMouseEnter(starIndex)}
          onClick={() => handleClick(starIndex)}
        >
          ★
        </span>
      ))}
    </div>
  );
};