import React from "react";
import { useDrop } from "react-dnd";
import Drag from "./Drag";

function DropZone({ items, id, scale, doc }) {
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
      className="Drop row border border-danger border-3"
      style={{
        // border: isOver
        //   ? "0.1rem solid rgba(255, 0, 0, 0.05)"
        //   : "0.1rem solid yellow",
        width: "11rem",
        // height: String(1/8)+"%",
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
      {doc.ShipList.map((Ship, i) => {
        return items.map((item,_) => {
          if (i === id && item.Name === Ship && item.Placed === doc.No) {
          // if (item.Name === Ship && item.Placed === doc.No) {
          // if (item.Placed === doc.No) {
            console.log(item)
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
          } else {
            return <></>;
          }
        });
      })}
    </div>
  );
}

export default DropZone;
