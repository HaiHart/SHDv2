import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "./DropAndDrag";

function Mold() {
  return (
    <div className="bg-light" style={{
      height: '1080px'
    }}>
    <DndProvider backend={HTML5Backend}>
      <DragDrop />
    </DndProvider>
    </div>
  );
}

export default Mold;
