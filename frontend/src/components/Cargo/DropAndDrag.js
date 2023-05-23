import React, { useState, useEffect } from "react";
import * as Wails from "../../wailsjs/runtime";
import WaitZone from "./Wait";
import Log from "./Log";
import DragSight from "./DragSight";
import Axios from "axios";

// TODO: set some way to zoom only the Drop zone
// also fine some way to be able to update dropzone size
function DragDrop() {
  const [dat, setData] = useState({
    ShipName: String,
    Name: String,
    Rv: [
      {
        Name: String,
        Cor: {
          Bay: Number,
          Row: Number,
          Tier: Number,
        },
        Iden: Number,
        Type: Number,
        Key: Number,
        Detail: {
          From: String,
          AtTime: String,
          By: String,
          Owner: String,
        },
      },
    ],
    version: -1,
    Log: [],
    Inval: [
      {
        Bay: Number,
        Row: Number,
        Tier: Number,
      },
    ],
    Bays: Number,
    Rows: Number,
    Tier: Number,
  });
  const [size, setSize] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [img, setImge] = useState(null);

  const [zPole, SetZ] = useState(0);

  const [pos, setPos] = useState({
    x: 0,
    y: 0,
    path: "http://localhost:4000/img",
    cur_name: "",
  });

  if (dat.version < 0) {
    window.go.main.Basic.Flip("yes", Number(0)).then((data) => {
      setData(data);
    });
  }

  Wails.EventsOn("List", (ata) => {
    if (dat.version !== ata.version) {
      setData(ata);
      SetZ(ata.CurBay)
      console.log(ata);
    }
  });

  useEffect(() => {
    window.go.main.Basic.Flip("yes", Number(0)).then((data) => {
      setData(data);
      setSize({
        x: data.Rows,
        y: data.Tiers,
        z: data.Bays,
      });
      console.log(dat);
    });
    window.go.main.Basic.GetImageFile().then((res) => {
      setPos({
        x: res.x,
        y: res.y,
      });
    });
  }, []);

  const saveCon = (e) => {
    e.preventDefault();
    window.go.main.Basic.SetImageFile(
      Number(pos.x),
      Number(pos.y),
      Number(size.x),
      Number(size.y)
    ).then((res) => {
      alert(res);
    });
    if (img === null) {
      return;
    }
    const formData = new FormData();
    formData.append("Img", img);
    try {
      Axios.post("http://localhost:4000/save", formData).then((res) => {
        if (res.data) {
          console.log(res.data);
        }
      });

      window.go.main.Basic.SetImageFile(
        Number(pos.x),
        Number(pos.y),
        Number(size.x),
        Number(size.y)
      ).then((res) => {
        alert(res);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setPos({
        ...pos,
        cur_name: img.name,
      });
    }
  };

  return (
    <div
      className="container-fluid "
      style={{
        height: "100%",
      }}
    >
      <div className="row">
        <div className="col-10">
          <div className="row">
            <div className="col-md">
              <div className="List row border border-primary rounded">
                <WaitZone items={dat.Rv} bay={zPole} />
              </div>
              <div>
                ------------------------------------------------------------------------------------------------------------------------------------
              </div>
              <div>
                <label>
                  Currently on {zPole}/{size.z - 1} Bay on Ship {dat.ShipName}{" "}
                  by {dat.Name}{" "}
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      if (zPole === size.z - 1) {
                        return;
                      }
                      window.go.main.Basic.Bay(Number(zPole + 1)).then();
                      SetZ(zPole + 1);
                    }}
                  >
                    Next Bay
                  </button>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={(e) => {
                      e.preventDefault();
                      window.go.main.Basic.CheckImabalance().then();
                    }}
                  >
                    Get Imbalance Bay
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      if (zPole === 0) {
                        return;
                      }
                      window.go.main.Basic.Bay(Number(zPole - 1)).then();
                      SetZ(zPole - 1);
                    }}
                  >
                    Prev Bay
                  </button>
                </label>
                {/* <div
                  className="input-group mb-2 "
                  label="Change number of row, colum input"
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
                </div> */}
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
                  <div className="row">
                    <input
                      className="col"
                      type="file"
                      name="myImage"
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
                      onClick={saveCon}
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
              </div>
              <div>
                ------------------------------------------------------------------------------------------------------------------------------------
              </div>
              <div
                style={{
                  height: "100%",
                }}
              >
                <DragSight
                  dat={dat}
                  box={size}
                  img={img}
                  pos={pos}
                  zIndex={zPole}
                />
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
