import React from 'react';
import './SkeletonCard.css';

const SkeletonCard = ({ count = 6, layout = 'horizontal' }) => {
  return (
    <div className={`skeleton-container skeleton-${layout}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-poster skeleton-shimmer" />
          <div className="skeleton-info">
            <div className="skeleton-title skeleton-shimmer" />
            <div className="skeleton-meta skeleton-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;
