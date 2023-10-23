import React from 'react';

export const CardReview = ({ review: { author, content } }) => {
  return (
    <div>
      <div className="card">
        <h5 className="card-header">Author: {author}</h5>
        <div className="card-body">
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
};
