import React from "react";

const Star = ({ filled }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={filled ? "currentColor" : "none"}
      viewBox="0 0 26 26"
      stroke="currentColor"
      className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.1 6.518a1 1 0 00.95.69h6.835c.969 0 1.371 1.24.588 1.81l-5.54 4.02a1 1 0 00-.364 1.118l2.1 6.518c.3.921-.755 1.688-1.539 1.118l-5.54-4.02a1 1 0 00-1.175 0l-5.54 4.02c-.784.57-1.838-.197-1.539-1.118l2.1-6.518a1 1 0 00-.364-1.118l-5.54-4.02c-.783-.57-.381-1.81.588-1.81h6.835a1 1 0 00.95-.69l2.1-6.518z"
      />
    </svg>
  );
};

export default Star;
