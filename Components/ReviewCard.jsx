import React from "react";
import Star from "./Star";

const ReviewCard = ({ rating, author, content }) => {
  return (
    <div className="flex text-gray-500 py-4 flex-col">
      <p>{author}</p>
      <p>{content}</p>
      {rating && (
        <div className="flex gap-1">
          {[...Array(10)].map((_, index) => (
            <Star filled={index + 1 <= rating} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
