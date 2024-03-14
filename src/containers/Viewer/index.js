import React, { Fragment, useState } from "react";
import HorizontalToolbar from "../../components/HorizontalToolbar";
import VerticalToolbar from "../../components/VerticalToolbar";
import ModelTreeProvider from "../../store/context-store/modelTreeProvider";
import ConfigProvider from "../../store/context-store/configProvider";
import { Provider } from "react-redux";
import store from "../../store/redux-store";
import ViewerSetup from "./ViewerSetup";
import ContextMenuProvider from "../ContextMenu/ContextMenuProvider";
import "../../styles/Hoops.css";
import CircularIndeterminate from "../../components/UI/CircularIndeterminate";
import ModuleNotFound from "../../components/UI/ModuleNotFound";
import { useEffect } from "react";

// This is the main Viewer Component.
// It is the starting point of the application.
// It display's HOOPS Web Viewer and tool bars, contextmenu, etc inside it.
export default function Viewer(props) {
  const {
    scsPath,
    configName = null,
    setData,
    onSuccess,
    onFailed,
    bgColor 
    = {
      top: { r: 128, g: 128, b: 128 },
      bottom: { r: 255, g: 255, b: 255 },
    }
    ,
  } = props;
  const [hwv, setHwv] = useState(null);
  const [model, setModel] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModuleFound, setIsModuleFound] = useState({
    isNotFound: false,
    message: "",
  });

  useEffect(() => {
    console.log(scsPath)
  }, [scsPath]) 

  return (
    <>
      <Provider store={store}>
        <ModelTreeProvider>
          <ConfigProvider>
            <div id="viewer">
              <ViewerSetup
                divId={"viewer"}
                scsPath={scsPath}
                configName={configName}
                setHwv={setHwv}
                setModel={setModel}
                setIsLoaded={setIsLoaded}
                setIsModuleFound={setIsModuleFound}
                isLoaded={isLoaded}
                setData={setData}
                hwv={hwv}
                onSuccess={onSuccess}
                onFailed={onFailed}
                bgColor={bgColor}
              />

              {hwv && (
                <Fragment>
                  <VerticalToolbar hwv={hwv} />
                  <HorizontalToolbar hwv={hwv} />
                  <ContextMenuProvider model={model} hwv={hwv} />
                </Fragment>
              )}

              {!isLoaded && <CircularIndeterminate />}
              {isModuleFound.isNotFound && (
                <ModuleNotFound isModuleFound={isModuleFound} />
              )}
            </div>
          </ConfigProvider>
        </ModelTreeProvider>
      </Provider>
    </>
  );
}
