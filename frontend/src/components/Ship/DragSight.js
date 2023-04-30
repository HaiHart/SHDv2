import React, { useState } from "react";
import DropZone from "./Drop";

function DragSight({ dat, box, img, pos }) {
  const [size, setSize] = useState({
    width: 1,
    height: 40,
    scale: 1,
  });

  const ZoomWheel = (e) => {
    if (!e.shiftKey) {
      return;
    }
    const delta = e.deltaY * -0.001;
    const newScale = delta + size.scale;
    setSize({
      width: size.width,
      height: size.height,
      scale: newScale,
    });
  };

  const getBg = () => {
    return {
      // height: "100%",
      backgroundImage:
        img !== null
          ? `url(${URL.createObjectURL(img)})`
          : "url('http://localhost:4040/img')",
      // backgroundPosition: `${pos.x}px ${pos.y}px`,
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
      width: "100%",
    };
  };

  return (
    <div style={getBg()}>
      <div
        className="border border-success border-3"
        onWheelCapture={ZoomWheel}
        style={{
          height: "100%",
          width: "100%",
          overflowX: "scroll",
          overflowY: "scroll",
        }}
      >
        <div
          style={{
            position: "relative",
            
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {dat.Docks.map((y, _) => {
            return (
              <div
                className={
                   `${y.BoarderRight === -1 ?" border-end border-danger border-3": ""} ` 
                }
                // className="border border-warning"
                style={{
                  // float: "left",
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  width: `calc(100%*(${y.Length}/${dat.Total}))`,
                }}
              >
                <div>{y.No}</div>
                {[...Array(8).keys()].map((_, i) => {
                  return (
                    <DropZone
                      items={dat.Ships}
                      scale={size.scale}
                      doc={y}
                      id={7 - i}
                      len={dat.Total}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DragSight;
