import React, { Fragment, useEffect, useState } from "react";
import ModelTree from "../../containers/ModelTree";
import { activeHandler } from "../../utils/activateBtn";
import { Tooltip, Divider } from "@mui/material";
import "../../styles/IconBtn.css";
import Configurations from "../Configurations";

// This component is reusable component to create buttons for both horizontal and vertical tool bar.
export default function IconBtn(props) {
  const {
    id,
    name,
    hwv,
    handleFunction,
    icon,
    alignment,
    menuOptions,
    setIcon,
    btnPosition,
  } = props;
  const [openTree, setOpenTree] = useState(false);
  const [showConfigs, setShowConfigs] = useState(false);
  const [rangeValue, setRangeValue] = useState("0");
  const [viewerDim, setViewerDim] = useState(null);

  useEffect(() => {
    let viewerElement = document.getElementById("canvas");
    let viewerHt = viewerElement.clientHeight;
    let viewerWd = viewerElement.clientWidth;
    setViewerDim({ viewerHt: viewerHt, viewerWd: viewerWd });
  }, []);

  // Sets the styles classes for horizontal and vertical toolbar.
  const toolbarStyle =
    alignment === "horizontal"
      ? "btn-group dropup toolbar-btn"
      : "btn-group dropend vertical-toolbar-btn";

  // Sets the rounded corners for horizontal and vertical toolbar.
  // 1. Set btnPosition prop as "start" and "end" for first and last button.
  // 2. Set btnPosition props as "rounded" if toolbar contains single button.
  const btnBorder =
    btnPosition === "rounded"
      ? "rounded"
      : alignment === "horizontal"
      ? btnPosition === "start"
        ? "rounded-start"
        : btnPosition === "end"
        ? "rounded-end"
        : ""
      : btnPosition === "start"
      ? "rounded-top"
      : btnPosition === "end"
      ? "rounded-bottom"
      : "";

  const modelTreeHandler = () => {
    if (showConfigs === true) {
      setShowConfigs(!showConfigs);
    }
    setOpenTree(!openTree);
  };

  const configsHandler = () => {
    if (openTree === true) {
      setOpenTree(!openTree);
    }

    setShowConfigs(!showConfigs);
  };

  return (
    <Fragment>
      <div className={`${toolbarStyle} ${btnBorder}`} key={id}>
        <Tooltip title={name} arrow={true} placement="bottom">
          {/* This is the toolbar main buttom */}
          <button
            className="mainBtn"
            type="button"
            id={id}
            data-bs-toggle={menuOptions ? "dropdown" : ""}
            data-bs-auto-close={name === "Model browser" ? "false" : "true"}
            aria-expanded="false"
            onClick={() => {
              activeHandler(id);
              if (handleFunction) {
                handleFunction();
              }
            }}
          >
            {icon}
          </button>
        </Tooltip>

        {/* This will produce sub buttons of main button for horizontal toolbar */}
        {menuOptions && (
          <ul
            className={
              alignment === "horizontal"
                ? "dropdown-menu toolbar-menu"
                : name === "Model browser"
                ? "dropdown-menu dropdown-menu2"
                : "dropdown-menu vertical-dropdown-menu"
            }
            aria-labelledby={id}
          >
            {alignment === "horizontal" &&
              menuOptions &&
              menuOptions.map((e, i) => {
                return (
                  <span key={e.subName}>
                    <Tooltip title={e.subName} placement="right" arrow={true}>
                      <li
                        onClick={() => {
                          if (setIcon && e.subName !== "Clear") {
                            setIcon(e.subIcon);
                          }
                          if (e.subName === "Explosion Magnitude") {
                            return;
                          }
                          e.func(hwv);
                        }}
                        onChange={(event) => {
                          e.func(hwv, parseInt(event.target.value));
                          setRangeValue(event.target.value);
                        }}
                      >
                        {e.subName !== "Explosion Magnitude" ? (
                          <button
                            className="dropdown-item toolbar-menu-btn"
                            href="#"
                          >
                            {e.subIcon}
                          </button>
                        ) : (
                          <>
                            <input
                              type="range"
                              className="form-range pt-1 px-1"
                              value={rangeValue}
                              min="0"
                              max="20"
                              step="1"
                              id="customRange2"
                            ></input>
                          </>
                        )}
                      </li>
                    </Tooltip>
                    {menuOptions.length - i > 1 && <Divider />}
                  </span>
                );
              })}

            {/* This will produce sub buttons of main button for vertical toolbar */}
            {alignment === "vertical" &&
              menuOptions &&
              menuOptions.map((e, i) => {
                return (
                  <span key={e.subName}>
                    <Tooltip title={e.subName} placement="top" arrow={true}>
                      <li
                        className="vertical-toolbar-menu"
                        onClick={() => {
                          if (setIcon) {
                            setIcon(e.subIcon);
                          }

                          if (e.subName === "Model Tree") {
                            modelTreeHandler();
                          } else if (e.subName === "Configurations") {
                            configsHandler();
                          } else {
                            e.func(hwv);
                          }
                        }}
                      >
                        <button
                          className={
                            name === "Model browser"
                              ? "dropdown-item vertical-toolbar-menu-btn2"
                              : "dropdown-item vertical-toolbar-menu-btn"
                          }
                          href="#"
                        >
                          {e.subIcon}
                        </button>
                      </li>
                    </Tooltip>
                    {menuOptions.length - i > 1 && (
                      <Divider orientation="vertical" flexItem />
                    )}
                  </span>
                );
              })}

            {/* Below code will dispaly Model Tree Browser and Configurations dropdowns based on conditions */}
            <span style={{position: "absolute", top:"2.5rem", left:"-1rem"}}>
              {openTree && viewerDim !== null && (
                <ModelTree
                  modelTreeHandler={modelTreeHandler}
                  hwv={hwv}
                  viewerDim={viewerDim}
                />
              )}
              {showConfigs && viewerDim !== null && (
                <Configurations hwv={hwv} viewerDim={viewerDim} />
              )}
            </span>
          </ul>
        )}
      </div>{" "}
    </Fragment>
  );
}
