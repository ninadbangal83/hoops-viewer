import React from "react";

// This is configurations context store to store data related to the configurations
const ConfigContext = React.createContext({
  selectedConfig: null,
  isFirstConfigLoaded: false,
  selectedConfigTreeData: [],
  selectedConfigTreeDataArr: [],
  selectedConfigNodeIds:[],
  configData: [],
  configArr: [],
  configNodeIds: [],
  newConfigArr: [],
  addConfigData: (data) => {},
  addSelectedConfig: (configId) => {},
  addSelectedConfigTreeData: (nodesArr) => {},
  setFirstConfig: () => {},
  addNewConfigArr: (data) => {},
});

export default ConfigContext;
