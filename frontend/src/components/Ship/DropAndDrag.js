import React, { useState, useEffect } from "react";
import * as Wails from "../../wailsjs/runtime";
import WaitZone from "./Wait";
import Log from "./Log";
import DragSight from "./DragSight";

// TODO: set some way to zoom only the Drop zone
// also fine some way to be able to update dropzone size
function DragDrop() {
  const [dat, setData] = useState({
    Docks: [],
    Ships: [],
    Log: [],
  });
  const [size, setSize] = useState({
    x: 8,
    y: 1,
  });
  const [img, setImge] = useState(null);

  const [pos, setPos] = useState({
    x: 0,
    y: 0,
    path: "http://localhost:4040/img",
    cur_name: "",
  });

  Wails.EventsOn("Ship", (ata) => {
    console.log("here");
    console.log(ata);
    setData(ata);
  });

  useEffect(() => {
    window.go.main.ShipStruct.Initial().then((a) => {
      console.log("nii");
      console.log(a);
      setData(a);
    });
  }, []);

  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-10">
          <div
            className="row"
            style={{
              alignSelf: "flex-start",
              width: "100%",
              height: "100%",
            }}
          >
            <div className="col-md">
              <div className="List row border border-primary rounded">
                <WaitZone items={dat.Ships} />
              </div>
              <div>
                ------------------------------------------------------------------------------------------------------------------------------------
              </div>
              {/* <div>
                <label>Change number of row, colum input</label>
                <div
                  className="input-group mb-2 "
                  label="Change number of row, colum input"
                  style={
                    {
                      // display: "flex",
                      // flexWrap: "wrap",
                      // flexDirection: "column",
                    }
                  }
                >
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Number of row for Block"
                    onChange={(e) => {
                      if (e.target.value === null || e.target.value === "") {
                        return;
                      }
                      if (e.target.value < 1) {
                        e.target.value = 1;
                        setSize({
                          y: Number(e.target.value),
                          x: size.x,
                          set: true,
                        });
                        return;
                      }
                      setSize({
                        y: Number(e.target.value),
                        x: size.x,
                        set: true,
                      });
                    }}
                  />
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Number of column for block"
                    onChange={(e) => {
                      if (e.target.value === null || e.target.value === "") {
                        return;
                      }
                      if (e.target.value < 1) {
                        e.target.value = 1;
                        setSize({
                          x: Number(e.target.value),
                          y: size.y,
                          set: true,
                        });
                        return;
                      }
                      setSize({
                        x: Number(e.target.value),
                        y: size.y,
                        set: true,
                      });
                    }}
                  />
                </div>
                <div className="input-group mb-2">
                  <button
                    type="button"
                    className="btn btn-primary input-group-prepend"
                    onClick={(e) => {
                      e.preventDefault();
                      setPos({
                        y: pos.y - 1,
                        x: pos.x,
                      });
                    }}
                  >
                    up
                  </button>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Y background"
                    value={pos.y}
                    onChange={(e) => {
                      if (e.target.value === null || e.target.value === "") {
                        return;
                      }
                      setPos({
                        y: Number(e.target.value),
                        x: pos.x,
                        path: pos.path,
                      });
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-primary input-group-append"
                    onClick={(e) => {
                      e.preventDefault();
                      setPos({
                        y: pos.y + 1,
                        x: pos.x,
                        path: pos.path,
                      });
                    }}
                  >
                    down
                  </button>
                </div>
                <div className="input-group mb-3">
                  <button
                    type="button"
                    className="btn btn-primary input-group-prepend"
                    onClick={(e) => {
                      e.preventDefault();
                      setPos({
                        y: pos.y,
                        x: pos.x - 1,
                        path: pos.path,
                      });
                    }}
                  >
                    left
                  </button>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="X background"
                    value={pos.x}
                    onChange={(e) => {
                      if (e.target.value === null || e.target.value === "") {
                        return;
                      }
                      setPos({
                        x: Number(e.target.value),
                        y: pos.y,
                        path: pos.path,
                      });
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-primary input-group-append"
                    onClick={(e) => {
                      e.preventDefault();
                      setPos({
                        y: pos.y,
                        x: pos.x + 1,
                        path: pos.path,
                      });
                    }}
                  >
                    right
                  </button>
                </div>
                <div>
                  <div
                    className="row"
                    style={
                      {
                        // display: "flex",
                        // flexWrap: "wrap",
                        // flexDirection: "column",
                      }
                    }
                  >
                    <input
                      className="col"
                      type="file"
                      name="myImage"
                      style={
                        {
                          // width: "25%",
                        }
                      }
                      onChange={(event) => {
                        setImge(event.target.files[0]);
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-primary col mb-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setImge(null);
                        window.go.main.Basic.RemoveImage().then((res) => {
                          console.log(res);
                        });
                      }}
                    >
                      Remove
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary col mb-2"
                      // onClick={saveCon}
                    >
                      Re-Config
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary col mb-2"
                      onClick={() => {
                        window.go.main.Basic.Flip("yes", Number(0)).then(
                          (data) => {
                            setData(data);
                          }
                        );
                      }}
                    >
                      Reload
                    </button>
                  </div>
                </div>
              </div> */}
              <div>
                ------------------------------------------------------------------------------------------------------------------------------------
              </div>
              <div
                style={{
                  height: "100%",
                }}
              >
                <DragSight dat={dat} box={size} img={img} pos={pos} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-2 h-100">
          <Log list={dat.Log} />
        </div>
      </div>
    </div>
  );
}

export default DragDrop;
