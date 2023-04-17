import React, { useState } from "react";
import { useDrag } from "react-dnd";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function Drag({ Iden, name, draggable, wait, detail, inTime, outTime }) {
  if (wait) {
  }
  const [{ isDragging }, drag] = useDrag((monitor) => ({
    type: "image",
    item: { Iden: Iden, Name: name },
    collect: (monitor) => {
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  }));

  const [time, setTime] = useState({
    inTime: inTime,
    outTime: outTime,
  });

  const handleTime = (e)=>{
    e.preventDefault()
    if (e.target.name === "in") {
      setTime({
        outTime:time.outTime,
        inTime: e.target.value
      })
    } else{
      setTime({
        inTime:time.inTime,
        outTime: e.target.value
      })
    }
  }

  const renderTooltip = (props) => (
    <Tooltip className="button-tooltip" {...props}>
      <ul>
        <li>From :{detail.From}</li>
        <li>Owner :{detail.Owner}</li>
        <li>By :{detail.By}</li>
        <li>At :{detail.AtTime}</li>
        <li>In : {inTime}</li>
        <li>Out: {outTime}</li>
      </ul>
    </Tooltip>
  );

  return (
    <OverlayTrigger
      delay={{ hide: 450, show: 300 }}
      overlay={renderTooltip}
      placement="bottom"
    >
      <div
        // className="bg-black "
        id={name}
        style={{
          backgroundColor: name !== "x" ? "black" : "DarkGrey",
          color: "white",
          visibility: isDragging ? "hidden" : "",
          text_align: name !== "x" ? "justify" : "center",
          width: "3rem",
          height: "3rem",
        }}
        ref={draggable ? drag : {}}
      >
        {name !== "x" ? Iden + " " + name : "X"}
      </div>
    </OverlayTrigger>
  );
}

export default Drag;
