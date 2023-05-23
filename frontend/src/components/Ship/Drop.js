import React from "react";
import { useDrop } from "react-dnd";
import Drag from "./Drag";

function DropZone({ items, id, scale, doc, len }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addItem(item.Name),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItem = (item) => {
    if (item === "") {
      return;
    }

    window.go.main.ShipStruct.PlaceShip(Number(doc.No), String(item)).then(
      () => {}
    );

    return;
  };
  return (
    <div
      
      style={{
        // width: `calc(20rem*(${doc.Length}/200))`,
        // height: String(1/8)+"%",
        width:"100%",
        height: "5rem",
        color: "blue",
        visibility: "visible",
        alignSelf: "flex-start",
        background: "rgba(255, 255, 255, 0.0 )",
        maxWidth: "none !important",
      }}
      ref={drop}
    >
      {doc.ShipList.map((Ship, i) => {
        return items.map((item, _) => {
          if (i === id && item.Name === Ship && item.Placed === doc.No) {
            // if (item.Name === Ship && item.Placed === doc.No) {
            // if (item.Placed === doc.No) {
            console.log(item);
            return (
              <Drag
                draggable={true}
                Iden={item.Iden}
                name={item.Name}
                detail={item.Detail}
                inTime={item.InTime}
                outTime={item.OutTime}
                wait={false}
                len={item.Length}
                put={false}
              />
            );
          } else if (i === id && item.Name === Ship) {
            return (
              <Drag
                draggable={false}
                Iden={item.Iden}
                name={"x"}
                detail={item.Detail}
                inTime={item.InTime}
                outTime={item.OutTime}
                wait={false}
                len={item.Length}
                put={false}
              />
            );
          } else {
            return <span></span>;
          }
        });
      })}
    </div>
  );
}

export default DropZone;
