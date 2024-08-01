import React from "react";

const ModalPopup = ({ open, onChange }) => {
  return (
    <div
      id="modalBackdrop"
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${
        open ? "show" : "hidden"
      }`}
      onClick={onChange}
    >
      <div
        className="bg-white rounded-lg p-8 max-w-md"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="text-xl font-bold mb-4">Modal Title</h2>
        <p className="text-gray-700 mb-4">Modal content goes here.</p>
        <button
          id="closeModalBtn"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={onChange}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalPopup;
