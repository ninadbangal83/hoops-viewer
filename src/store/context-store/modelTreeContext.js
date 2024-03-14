import React from "react";

// This is Model Tree context store to store data related to the Model Tree
const ModelTreeContext = React.createContext({
  checkedNodes: [],
  modelTreeData: [],
  modelTreeDataArr: [],
  modelTreeNodeIds: [],
  newModelTreeData: [],
  addModelTreeData: (hwv, data) => {},
  addNewModelTreeData: (data) => {},
  setCheckedNodes: (data) => {},
});

export default ModelTreeContext;
