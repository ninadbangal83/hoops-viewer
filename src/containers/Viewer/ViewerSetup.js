import React, { useContext, useEffect, useState } from "react";
import Communicator from "communicator";
import { getModelTreeNodes } from "../../utils/modelTree";
import { clearMeasurementOperators } from "../../utils/measurement";
import ModleTreeContext from "../../store/context-store/modelTreeContext";
import ConfigContext from "../../store/context-store/configContext";
import { ContextMenuOperator } from "../ContextMenu/ContextMenuOperator";
import { useDispatch } from "react-redux";
import { contextMenuActions } from "../../store/redux-store/contextMenu";

// This component is used to set up the viewer.
// 1. It creates the viewer and loads the model tree
// 2. It sets and loads the configuration.
// 3. It sets and displays differents viewer messages based on conditions.
export default function ViewerSetup(props) {
  const {
    divId,
    scsPath,
    configName,
    setHwv,
    setModel,
    isLoaded,
    setIsLoaded,
    setIsModuleFound,
    setData,
    hwv,
    onSuccess,
    onFailed,
    bgColor,
  } = props;
  const dispatch = useDispatch();
  const configCtx = useContext(ConfigContext);
  const treeCtx = useContext(ModleTreeContext);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (isLoaded && hwv) {
      getConfigId(hwv, configName);
    }
  }, [configName, id]);

  useEffect(() => {
    if (isLoaded && hwv) {
      hwv.model.activateCadConfiguration(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (isLoaded && hwv && bgColor) {
      hwv.view.setBackgroundColor(
        Communicator.Color.createFromFloat(
          bgColor.top.r / 255,
          bgColor.top.g / 255,
          bgColor.top.b / 255
        ),
        Communicator.Color.createFromFloat(
          bgColor.bottom.r / 255,
          bgColor.bottom.g / 255,
          bgColor.bottom.b / 255
        )
      );
    }
  }, [bgColor]);

  useEffect(() => {
    if (configName === null || configName === "") {
      setIsLoaded(true);
    }
    let element = document.getElementById("viewer");
    let parent = element.parentElement;
    parent.style.position = "absolute";
    getViewer(divId, scsPath, setHwv);
  }, [scsPath]);

  const showContextMenuHandler = (visibility) => {
    dispatch(contextMenuActions.setVisibility(visibility));
  };

  const contextMenuDataHandler = (data) => {
    dispatch(contextMenuActions.setData(data));
  };

  const contextMenuPositionHandler = (position) => {
    dispatch(contextMenuActions.setPosition(position));
  };

  const getViewer = async (divId, scsPath) => {
    try {
      let module = await import(`../../${scsPath}`);

      let viewer = new Communicator.WebViewer({
        containerId: divId,
        endpointUri: module.default,
      });

      if (viewer) {
        setIsModuleFound({ isNotFound: false, message: "" });
        if (onSuccess) {
          onSuccess("Model Loaded successfully");
        }
        startViewer(viewer);

        initializeContextMenuOperator(viewer);
      }
    } catch (error) {
      setIsModuleFound({ isNotFound: true, message: "Model not found!" });
      if (onFailed) {
        onFailed("Model not found!");
      }
    }
  };

  const startViewer = (viewer) => {
    window.onresize = () => {
      viewer.resizeCanvas();
    };

    if (viewer) {
      viewer.start();
      viewer.setCallbacks({
        sceneReady: () => {
          viewer.view.setBackgroundColor(
            Communicator.Color.createFromFloat(
              bgColor.top.r / 255,
              bgColor.top.g / 255,
              bgColor.top.b / 255
            ),
            Communicator.Color.createFromFloat(
              bgColor.bottom.r / 255,
              bgColor.bottom.g / 255,
              bgColor.bottom.b / 255
            )
          );
          viewer.view.getAxisTriad().enable();
          viewer.view.getNavCube().enable();
        },
        measurementCreated: () => {
          clearMeasurementOperators(viewer);
        },

        modelStructureReady: async () => {
          // setPmis(viewer, false)
          setHwv(viewer);
          let ids = [];
          let defaultConfig = await viewer.model.getDefaultCadConfiguration();
          let configData = await getConfigData(viewer);

          if (configName === null || configName === "") {
            configCtx.addConfigData(configData);
            setData(configData);
            configCtx.addSelectedConfig(defaultConfig);
            if (configData) {
              await activateParentNodes(viewer, defaultConfig, ids);
            }
            await getModelTreeNodes(viewer, treeCtx, Communicator);

            return;
          }
          let configId = await getConfigId(viewer, configName);

          if (configId === undefined) {
            setIsLoaded(true);
            setIsModuleFound({
              isNotFound: true,
              message: "Config not found!",
            });
            if (onFailed) {
              onFailed("Config not found!");
            }
            // configCtx.addSelectedConfig(defaultConfig);
            // setIsLoaded(true);
            // await getModelTreeNodes(viewer, treeCtx);
            return;
          }

          configCtx.addSelectedConfig(configId);
          if (configData) {
            await activateParentNodes(viewer, configId, ids);
          }
          activateConfigHandler(viewer, configId);
        },
      });
    }
  };

  const initializeContextMenuOperator = (viewer) => {
    const operatorManager = viewer.operatorManager;
    const contextMenuOperator = new ContextMenuOperator(
      viewer,
      showContextMenuHandler,
      contextMenuDataHandler,
      contextMenuPositionHandler,
      setModel
    );
    const contextMenuOperatorHandle =
      operatorManager.registerCustomOperator(contextMenuOperator);
    operatorManager.push(contextMenuOperatorHandle);
  };

  async function getConfigId(hwv, configName) {
    let configMap;
    if (!isLoaded) {
      configMap = await getConfigData(hwv);
    } else {
      configMap = configCtx.configData;
    }

    if (configMap === null || configMap.length === 0) {
      return undefined;
    }

    let configId = await configMap.get(configName);

    setId(configId);
    return configId;
  }

  async function activateConfigHandler(hwv, configId) {
    sleep(100).then(() => {
      setIsLoaded(true);
    });
    hwv.model.activateCadConfiguration(Number(configId));
    await getModelTreeNodes(hwv, treeCtx, Communicator);
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const getConfigData = async (hwv) => {
    //
    let configs = await hwv.model.getCadConfigurations();

    if (Object.keys(configs).length === 0) {
      return null;
    }

    let configArr = Object.entries(configs).map(([key, value]) => [key, value]);

    let configMap = new Map(configArr);

    configCtx.addConfigData(configMap);
    setData(configMap);

    return configMap;
  };

  const activateParentNodes = async (hwv, nodeId, ids) => {
    const parentNodeId = hwv.model.getNodeParent(nodeId);
    if (parentNodeId !== null) {
      ids.push(parentNodeId);
      activateParentNodes(hwv, parentNodeId, ids);
    } else {
      await hwv.model.setNodesVisibility(ids, true);
      return;
    }
  };

  return <></>;
}
