import React, { useState } from "react";

function DragAndDrop() {
  const [dragging, setDragging] = useState(false);
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item);
    setDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const item = e.dataTransfer.getData("text/plain");
    setDroppedItems((prevItems) => [...prevItems, item]);
    setDragging(false);
  };

  const items = ["Item 1", "Item 2", "Item 3"];

  return (
    <div>
      <div className="drag-area">
        {items.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            className={`draggable-item ${dragging ? "dragging" : ""}`}
          >
            {item}
          </div>
        ))}
      </div>

      <div
        className="drop-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        Drop items here
        <div>
          {droppedItems.map((item, index) => (
            <div key={index} className="dropped-item">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DragAndDrop;
