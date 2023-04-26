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
      height: "100%",
      backgroundImage:
        img !== null
          ? `url(${URL.createObjectURL(img)})`
          : "url('http://localhost:4000/img')",
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
          overflowX: "scroll",
          overflowY: "scroll",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            transform: `scale(${size.scale}) translate(${pos.x}px,${pos.y}px)` ,
            width: "fit-content",
            height: "fit-content",
          }}
        >
          {[...Array(box.y).keys()].map((_, y) => {
            return (
              <div
                style={{
                  height: "5rem",
                  width: "90rem",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {[...Array(box.x).keys()].map((_, i) => {
                  return (
                    <DropZone
                      items={dat.Rv}
                      id={Number(i + y * box.x)}
                      scale={size.scale}
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
