import { useReducer } from "react";
import ConfigContext from "./configContext";
import Communicator from "communicator"

const defaultConfigState = {
  selectedConfig: null,
  isFirstConfigLoaded: false,
  selectedConfigTreeData: [],
  selectedConfigNodeIds: [],
  configData: [],
  configArr: [],
  configNodeIds: [],
  newConfigArr: [],
};

const configReducer = (state, action) => {
  if (action.type === "Add") {
    const updatedConfigData = action.data;
    const updatedConfigArr = action.arrData;
    const updatedConfigNodeIds = action.nodeIdArr;

    return {
      selectedConfig: state.selectedConfig,
      isFirstConfigLoaded: state.isFirstConfigLoaded,
      selectedConfigTreeData: state.selectedConfigTreeData,
      selectedConfigTreeDataArr: state.selectedConfigTreeDataArr,
      selectedConfigNodeIds: state.selectedConfigNodeIds,
      configData: updatedConfigData,
      configArr: updatedConfigArr,
      configNodeIds: updatedConfigNodeIds,
      newConfigArr: state.newConfigArr,
    };
  }

  if (action.type === "AddSelectedConfig") {
    const updatedSelectedConfig = action.configId;

    return {
      selectedConfig: updatedSelectedConfig,
      isFirstConfigLoaded: state.isFirstConfigLoaded,
      selectedConfigTreeData: state.selectedConfigTreeData,
      selectedConfigTreeDataArr: state.selectedConfigTreeDataArr,
      selectedConfigNodeIds: state.selectedConfigNodeIds,
      configData: state.configData,
      configArr: state.configArr,
      configNodeIds: state.configNodeIds,
      newConfigArr: state.newConfigArr,
    };
  }

  if (action.type === "AddSelectedConfigTreeData") {
    let updatedSelectedConfigTreeData = action.nodesArr;
    const nodeIdArr = Array.from(action.nodesArr.keys());
    const updatedSelectedConfigTreeDataArr = Array.from(
      action.nodesArr,
      ([key, value]) => {
        return { nodeName: value, nodeId: key };
      }
    );

    let updatedSelectedConfigNodeIds = [];

    nodeIdArr.forEach((nodeId) => {
      if (action.hwv.model.getNodeType(nodeId) !== Communicator.NodeType.Pmi) {
        updatedSelectedConfigNodeIds.push(nodeId);
      }
    });

    return {
      selectedConfig: state.selectedConfig,
      isFirstConfigLoaded: state.isFirstConfigLoaded,
      selectedConfigTreeData: updatedSelectedConfigTreeData,
      selectedConfigTreeDataArr: updatedSelectedConfigTreeDataArr,
      selectedConfigNodeIds: updatedSelectedConfigNodeIds,
      configData: state.configData,
      configArr: state.configArr,
      configNodeIds: state.configNodeIds,
      newConfigArr: state.newConfigArr,
    };
  }

  if (action.type === "FirstConfig") {
    return {
      selectedConfig: state.selectedConfig,
      isFirstConfigLoaded: true,
      selectedConfigTreeData: state.selectedConfigTreeData,
      selectedConfigTreeDataArr: state.selectedConfigTreeDataArr,
      selectedConfigNodeIds: state.selectedConfigNodeIds,
      configData: state.configData,
      configArr: state.configArr,
      configNodeIds: state.configNodeIds,
      newConfigArr: state.newConfigArr,
    };
  }

  if (action.type === "AddNewConfigArr") {
    const updatedNewConfigArr = action.data;
    return {
      selectedConfig: state.selectedConfig,
      isFirstConfigLoaded: state.isFirstConfigLoaded,
      selectedConfigTreeData: state.selectedConfigTreeData,
      selectedConfigTreeDataArr: state.selectedConfigTreeDataArr,
      selectedConfigNodeIds: state.selectedConfigNodeIds,
      configData: state.configData,
      configArr: state.configArr,
      configNodeIds: state.configNodeIds,
      newConfigArr: updatedNewConfigArr,
    };
  }
};

// This is configurations context provider.
// It consist functions for manipulating, storing the configuration data.
export default function ConfigProvider(props) {
  const [configState, dispatchConfigAction] = useReducer(
    configReducer,
    defaultConfigState
  );

  const addConfigDataHandler = (data) => {
    let arrData = [];
    let nodeIdArr = [];
    if (data !== null) {
      data.forEach((v, k) => {
        arrData.push([v, k]);
        nodeIdArr.push(k);
      });
    }

    dispatchConfigAction({
      type: "Add",
      data: data,
      arrData: arrData,
      nodeIdArr: nodeIdArr,
    });
  };

  const addSelectedConfigHandler = (configId) => {
    dispatchConfigAction({ type: "AddSelectedConfig", configId: configId });
  };

  const addSelectedConfigTreeDataHandler = (hwv, nodesArr) => {
    dispatchConfigAction({
      type: "AddSelectedConfigTreeData",
      hwv:hwv,
      nodesArr: nodesArr,
    });
  };

  const setFirstConfigHandler = () => {
    dispatchConfigAction({
      type: "FirstConfig",
    });
  };

  const addNewConfigArrHandler = (data) => {
    dispatchConfigAction({
      type: "AddNewConfigArr",
      data: data,
    });
  };

  const configContext = {
    selectedConfig: configState.selectedConfig,
    isFirstConfigLoaded: configState.isFirstConfigLoaded,
    selectedConfigTreeData: configState.selectedConfigTreeData,
    selectedConfigTreeDataArr: configState.selectedConfigTreeDataArr,
    selectedConfigNodeIds: configState.selectedConfigNodeIds,
    configData: configState.configData,
    configArr: configState.configArr,
    configNodeIds: configState.configNodeIds,
    addConfigData: addConfigDataHandler,
    addSelectedConfig: addSelectedConfigHandler,
    addSelectedConfigTreeData: addSelectedConfigTreeDataHandler,
    setFirstConfig: setFirstConfigHandler,
    newConfigArr: configState.newConfigArr,
    addNewConfigArr: addNewConfigArrHandler,
  };

  return (
    <ConfigContext.Provider value={configContext}>
      {props.children}
    </ConfigContext.Provider>
  );
}
