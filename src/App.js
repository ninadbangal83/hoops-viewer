import { Fragment, useEffect, useState } from "react";
import Viewer from "./containers/Viewer";
import "./styles/Hoops.css";
import OuterFeatures from "./OuterFeatures";

function App() {
  console.log('app')
  // This are the states used if the configuration dropdown list to be displayed outside the Viewer component.
  const [data, setData] = useState(null); //Stores configurations in Map format.
  const [cData, setCData] = useState([]); //Stores configurations in Array format.

  const [bgColor, setBGColor] = useState();

  // This is the configuration name, optional prop sent to the Viewer component
  // 1. If this props is sent as empty string, null or undefiend will display default config.
  // 2. If the configuration name sent as prop not present in the configuration list will display config not found.
  // 3. Only the correct configuration name sent as prop will display the corresponding prop present in the configuration list.
  const [configName, setConfigName] = useState("");
  const [model, setModel] = useState("aquo_bottle");
  const models = [
    "aquo_bottle",
    "3mm-bolt",
    "Full-assembly",
    "arboleda",
    "bnc",
    "EnginePoints",
    "HotelFloorplan",
    "microengine",
    "MountainHome",
    "landinggear",
  ];

  // This is the SCS file path sent to the Viewer component as a prop.
  // 1. If this props is sent as incorrect Model name, null or undefiend will display Model not found.
  // 2. Only the correct Model name sent as prop will display the the model present in the data folder.
  const scsPath = `data/models/${model}.scs`;

  useEffect(() => {
    console.log(model)
  }, [model])

  useEffect(() => {
    let configNames = [];
    if (data !== null) {
      data.forEach((v, k) => {
        configNames.push(v);
      });
    }
    setCData(configNames);
  }, [data]);

  const onViewerLoadedSuccessfully = (message) => {
    console.log(message);
  };
  const onViewerLoadingFailed = (message) => {
    console.log(message);
  };

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  return (
    <Fragment>
      <div id="canvas">
        <Viewer
          scsPath={scsPath}
          configName={configName}
          setData={setData}
          onSuccess={onViewerLoadedSuccessfully}
          onFailed={onViewerLoadingFailed}
          bgColor={bgColor}
        />

        <OuterFeatures
          setConfigName={setConfigName}
          cData={cData}
          bgColor={bgColor}
          setBGColor={setBGColor}
          hexToRgb={hexToRgb}
          models={models}
          setModel={setModel}
        />
      </div>
    </Fragment>
  );
}

export default App;
