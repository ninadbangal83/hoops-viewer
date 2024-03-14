import React from "react";

export default function OuterFeatures(props) {
  const { setConfigName, cData, bgColor, setBGColor, hexToRgb, models, setModel } = props;
  return (
    <div className="row">
      {/* <div className="col-6" style={{ marginTop: "1rem", width: "10rem" }}>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            setConfigName(e.target.value);
          }}
        >
          {cData.length !== 0 &&
            cData.map((e, i) => {
              return (
                <option value={e} key={i}>
                  {e}
                </option>
              );
            })}
        </select>
      </div> */}
      <div className="col-6" style={{ marginTop: "1rem", width: "10rem" }}>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            setModel(e.target.value);
          }}
        >
          {models.length !== 0 &&
            models.map((e, i) => {
              return (
                <option value={e} key={i}>
                  {e}
                </option>
              );
            })}
        </select>
      </div>
      <div className="col-6" style={{ marginTop: "1rem", width: "10rem" }}>
        <input
          type="color"
          className="form-control form-control-color"
          id="exampleColorInput"
          value={bgColor ? bgColor.hexCode : "#563d7c"}
          title="Choose your color"
          onChange={(e) => {
            let hexCode = e.target.value;
            let decValue = hexToRgb(hexCode);

            setBGColor({
              top: { r: decValue.r, g: decValue.g, b: decValue.b },
              bottom: { r: 255, g: 255, b: 255 },
              hexCode: hexCode,
            });
          }}
        />
      </div>
    </div>
  );
}
