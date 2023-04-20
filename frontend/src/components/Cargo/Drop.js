import React from "react";
import { useDrop } from "react-dnd";
import Drag from "./Drag";
// import { Flip } from "../wailsjs/go/main/Basic";

function DropZone({ items, id, scale}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addItem(item.Iden),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItem = (item) => {
    if (item <= 0) {
      return;
    }

    window.go.main.Basic.Flip(String(item), Number(id)).then((data) => {
    });

    return;
  };


  return (
    <div
      className="Drop"
      style={{
        border: isOver
          ? "1rem solid rgba(255, 0, 0, 0.05)"
          : "1rem solid yellow",
        width: "5rem",
        height: "5rem",
        color: "blue",
        visibility: "visible",
        alignSelf: "flex-start",
        background: "rgba(255, 255, 255, 0.0 )",
        // opacity:"0.0",
        // transform: `scale(${scale})`,
      }}
      ref={drop}
    >
      {items.map((item) => {
        if (item.Placed === id) {
          return <Drag draggable={true} Iden={item.Iden} name={item.Name} detail={item.Detail} />;
        } else {
          return <></>;
        }
      })}
    </div>
  );
}

export default DropZone;
