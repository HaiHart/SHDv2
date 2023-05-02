import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import Drag from "./Drag";

function DropZone({ items, id, bay, row, tier}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addItem(item.Iden),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [cor,setCor] =useState({
    bay:bay,
    row:row,
    tier:tier,
  })

  useEffect(()=>{
    console.log(bay,row,tier)
    // setCor{{
    //   bay:bay
    // }}
  },[bay])

  const addItem = (item) => {
    if (item <= 0) {
      return;
    }
    console.log(bay,row,tier)
    // window.go.main.Basic.Flip(
    //   String(item),
    //   Number(cor.bay),
    //   Number(cor.row),
    //   Number(cor.tier)
    // ).then((data) => {});
    window.go.main.Basic.Flip(
      String(item),
      Number(id),
      
    ).then((data) => {});

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
      }}
      ref={drop}
    >
      {items.map((item) => {
        if (
          item.Cor.Bay === bay &&
          item.Cor.Row === row &&
          item.Cor.Tier === tier
        ) {
          return (
            <Drag
              draggable={true}
              Iden={item.Iden}
              name={item.Name}
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

export default DropZone;
