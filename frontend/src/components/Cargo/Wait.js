import React from "react";
import { useDrop } from "react-dnd";
import Drag from "./Drag";

function WaitZone({ items, bay }) {
  const [{ isOut }, out] = useDrop(() => ({
    accept: "image",
    drop: (item) => outItem(item.Iden),
    collect: (monitor) => ({
      isOut: !!monitor.isOver(),
    }),
  }));
  const outItem = (item) => {
    if (item < 0) {
      return;
    }
    window.go.main.Basic.Flip(
      String(item),
      Number(-1),
      // Number(-1),
      // Number(-1)
    ).then((data) => {});

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
        height: "5rem",
      }}
      ref={out}
    >
      {items.map((item) => {
        if (
          item.Cor.Bay === -1 &&
          item.Cor.Row === -1 &&
          item.Cor.Tier === -1 &&
          item.Type == bay%2
        ) {
          return (
            <Drag
              draggable={true}
              Iden={item.Iden}
              name={item.Name}
              wait={true}
              detail={item.Detail}
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
