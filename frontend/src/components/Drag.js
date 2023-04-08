import React from "react";
import { useDrag } from "react-dnd";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function Drag({ Iden, name, draggable, wait, detail }) {
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

  const renderTooltip = (props) => (
    <Tooltip className="button-tooltip" {...props}>
      <ul>
        <li>From :{detail.From}</li>
        <li>Owner :{detail.Owner}</li>
        <li>By :{detail.By}</li>
        <li>At :{detail.AtTime}</li>
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
        className="bg-black "
        id={name}
        style={{
          backgroundColor: "black",
          color: "white",
          visibility: isDragging ? "hidden" : "",
          text_align: "justify",
          width: "3rem",
          height: "3rem",
        }}
        ref={draggable ? drag : {}}
      >
        {Iden} {name}
      </div>
      {/* <Tooltip anchorSelect={"#" + name}>
        
      </Tooltip> */}
    </OverlayTrigger>
  );
}

export default Drag;
