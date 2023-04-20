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
          : "url('http://localhost:4040/img')",
      backgroundPosition: `${pos.x}px ${pos.y}px`,
      backgroundSize: "auto 100%",
      backgroundRepeat: "no-repeat",
      width: "100%",
    };
  };

  return (
    <div style={getBg()}>
      <div
        className="border border-success border-3 container-fluid"
        onWheelCapture={ZoomWheel}
        style={{
          height: "100%",
          width: "100%",
          overflowX: "scroll !important",
          overflowY: "scroll !important",
        }}
      >
        {/* <div className="container-fluid"
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            transformOrigin: "0 0",
            paddingTop: `calc(5rem)`,
          }}
        > */}
        <div
          className="row"
          style={{
            height: "100%",
            width: "100%",
            overflowX: "scroll !important",
            overflowY: "scroll !important",
          }}
        >
          {dat.Docks.map((y, _) => {
            return (
              <div className="col-2">
                <div className="row">{y.No}</div>
                {[...Array(8).keys()].map((_, i) => {
                  return (
                    <DropZone
                      items={dat.Ships}
                      scale={size.scale}
                      doc={y}
                      id={i}
                      len={dat.Docks.length}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default DragSight;
