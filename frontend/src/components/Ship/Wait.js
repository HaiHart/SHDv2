import React from "react";
import { useDrop } from "react-dnd";
import Drag from "./Drag";
// import { Flip } from "../wailsjs/go/main/Basic";

function WaitZone({ items }) {
  // const list = items.filter(ele=>ele.Placed<0)

  const [{ isOut }, out] = useDrop(() => ({
    accept: "image",
    drop: (item) => outItem(item.Name),
    collect: (monitor) => ({
      isOut: !!monitor.isOver(),
    }),
  }));
  const outItem = (item) => {
    if (item === "") {
      return;
    }
    window.go.main.ShipStruct.PlaceShip(Number(-1), String(item)).then((data) => {
    });

    return;
  };
  return (
    <div
      className="wait"
      style={{
        border: isOut
          ? "0.5rem solid rgba(0, 0, 0, 0.05)"
          : "0.5rem solid green",
        flexDirection: "row",
        flexWrap: "wrap",
        display: "flex",
        flex: "2",
        height: "15rem",
        overflowX:"scroll",
      }}
      ref={out}
    >
      {items.map((item) => {
        if (item.Placed < 0) {
          return (
            <Drag
              draggable={true}
              Iden={item.Iden}
              name={item.Name}
              wait={true}
              detail={item.Detail}
              inTime={item.InTime}
              outTime={item.OutTime}
              len={item.Length}
              put={true}
            />
          );
        } else {
          return <></>;
        }
      })}
    </div>
  );
}

export default WaitZone;
