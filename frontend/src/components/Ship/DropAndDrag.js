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
    Docks: [
      {
        No: Number,
        Name: String,
        Length: Number,
        BoarderRight: Number,
        ShipList: [],
      },
    ],
    Ships: [],
    Log: [],
    Total: Number,
  });
  const [size, setSize] = useState({
    x: 8,
    y: 1,
  });
  const [img, setImge] = useState(null);

  const [pos, setPos] = useState({
    x: 0,
    y: 0,
    path: "http://localhost:4040/Ship/img",
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

  const saveCon = (e) => {
    e.preventDefault();

    if (img === null) {
      return;
    }
    const formData = new FormData();
    formData.append("Img", img);
    try {
      Axios.post("http://localhost:4040/save", formData).then((res) => {
        alert(res)
      });
    } catch (error) {
      alert(error);
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
                <WaitZone items={dat.Ships} />
              </div>
              <div>
                ------------------------------------------------------------------------------------------------------------------------------------
              </div>
              <div>
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
                        window.go.main.ShipStruct.RemoveImage().then((res) => {
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
                  </div>
                </div>
              </div>
              <div>
                ------------------------------------------------------------------------------------------------------------------------------------
              </div>
              <div
                style={{
                  // height: "100%",
                  width: "100%",
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
