import React from "react";
import { useDrop } from "react-dnd";
import Drag from "./Drag";

function DropZone({ items, id, scale, doc }) {
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

    window.go.main.ShipStruct.PlaceShip(Number(doc.No), String(item)).then(
      () => {}
    );

    return;
  };

  return (
    <div
      className="Drop"
      style={{
        border: isOver
          ? "1rem solid rgba(255, 0, 0, 0.05)"
          : "1rem solid yellow",
        width: "100%",
        height: "calc(1/8)",
        color: "blue",
        visibility: "visible",
        alignSelf: "flex-start",
        background: "rgba(255, 255, 255, 0.0 )",
        // opacity:"0.0",
        // transform: `scale(${scale})`,
      }}
      ref={drop}
    >
      {doc.ShipList.map((Ship, i) => {
        items.map((item) => {
          if (i === id && item.Name === Ship && item.Placed === doc.No) {
            return (
              <Drag
                draggable={true}
                Iden={item.Iden}
                name={item.Name}
                detail={item.Detail}
                inTime={item.InTime}
                outTime={item.OutTime}
                wait={false}
              />
            );
          } else {
            return <></>;
          }
        });
      })}
    </div>
  );
}

export default DropZone;
