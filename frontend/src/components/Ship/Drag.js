import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Popover } from "react-bootstrap";

function Drag({ Iden, name, draggable, wait, detail, inTime, outTime, len, put }) {
  const[show,setShow]=useState(false)
  const target=useRef(null)
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

  const changeTime =(e)=>{
    e.preventDefault()
    window.go.main.ShipStruct.SetTime(name, String(time.inTime), String(time.outTime)).then(a=>{
      alert(a)
    })
  }

  const renderTooltip = (props) => (
    <Popover className="button-tooltip" {...props}>
      <ul>
        <li>From :{detail.From}</li>
        <li>In : {inTime}</li>
        <li>Out: {outTime}</li>
        {put? <li>In:<input type="datetime-local" value={time.inTime} onChange={handleTime} name="in"/></li>:<></>}
        {put? <li>Out:<input type="datetime-local" value={time.outTime} onChange={handleTime} name="out"/></li>:<></>}
        {put? <li><input type="button" value={"Submit"} onClick={changeTime}/></li>:<></>}
      </ul>
    </Popover>
  );

  return (
    <OverlayTrigger
      // delay={{ hide: 450, show: 300 }} 
      show={show}
      overlay={renderTooltip}
      placement="bottom"
    >
      <div
        className="bg-black border border-light"
        id={name}
        onClick={()=>{
          setShow(!show)
        }}
        style={{
          // backgroundColor: name !== "x" ? "black" : "DarkGrey",
          color: "white",
          visibility: isDragging ? "hidden" : "",
          text_align: name !== "x" ? "justify" : "center",
          width: put?String("calc(100%/6 *("+String(len)+"/"+String(200)+"))"):"calc(100% *("+String(len)+"/"+String(200)+"))",
          height: "4rem",
          overflowX:"visible",
          maxWidth:"none !important",
        }}
        ref={draggable ? drag : {}}
      >
        {name !== "x" ? Iden + " " + name : "X"}
      </div>
    </OverlayTrigger>
  );
}

export default Drag;
