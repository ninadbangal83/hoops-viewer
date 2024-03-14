import { useReducer } from "react";
import modelTreeContext from "./modelTreeContext";
import Communicator from "communicator";

const deefaultModelTreeState = {
  checkedNodes: [],
  modelTreeData: [],
  modelTreeDataArr: [],
  modelTreeNodeIds: [],
  newModelTreeData: [],
};

const modelTreeReducer = (state, action) => {
  if (action.type === "Add") {
    const updatedModelTreeData = action.data;
    let nodeIdArr = Array.from(action.data.keys());
    const updatedModelTreeDataArr = Array.from(action.data, ([key, value]) => {
      return { nodeName: value, nodeId: key };
    });
    let updatedModelTreeNodeIds = [];

    nodeIdArr.forEach((nodeId) => {
      if (action.hwv.model.getNodeType(nodeId) !== Communicator.NodeType.Pmi) {
        updatedModelTreeNodeIds.push(nodeId);
      }
    });


    return {
      modelTreeData: updatedModelTreeData,
      modelTreeDataArr: updatedModelTreeDataArr,
      modelTreeNodeIds: updatedModelTreeNodeIds,
      newModelTreeData: state.newModelTreeData,
      checkedNodes: updatedModelTreeNodeIds,
    };
  }

  if (action.type === "AddNodeIds") {
    const updatedNewModelTreeData = action.data;
    return {
      modelTreeData: state.modelTreeData,
      modelTreeDataArr: state.modelTreeDataArr,
      modelTreeNodeIds: state.modelTreeNodeIds,
      newModelTreeData: updatedNewModelTreeData,
      checkedNodes: state.checkedNodes,
    };
  }

  if (action.type === "SetCheckedNodes") {
    const updatedCheckedNodes = action.data;
    return {
      modelTreeData: state.modelTreeData,
      modelTreeDataArr: state.modelTreeDataArr,
      modelTreeNodeIds: state.modelTreeNodeIds,
      newModelTreeData: state.newModelTreeData,
      checkedNodes: updatedCheckedNodes,
    };
  }
};

// This is Model Tree context provider.
// It consist functions for manipulating, storing the Model Tree data.
export default function ModelTreeProvider(props) {
  const [treeState, dispatchModelTreeAction] = useReducer(
    modelTreeReducer,
    deefaultModelTreeState
  );

  const addModelTreeDataHandler = (hwv, data) => {
    dispatchModelTreeAction({ type: "Add", hwv: hwv, data: data });
  };

  const addNewModelTreeDataHandler = (data) => {
    dispatchModelTreeAction({ type: "AddNodeIds", data: data });
  };

  const setCheckedNodesDataHandler = (data) => {
    dispatchModelTreeAction({ type: "SetCheckedNodes", data: data });
  };

  const treeContext = {
    modelTreeData: treeState.modelTreeData,
    modelTreeDataArr: treeState.modelTreeDataArr,
    modelTreeNodeIds: treeState.modelTreeNodeIds,
    newModelTreeData: treeState.newModelTreeData,
    checkedNodes: treeState.checkedNodes,
    addModelTreeData: addModelTreeDataHandler,
    addNewModelTreeData: addNewModelTreeDataHandler,
    setCheckedNodes: setCheckedNodesDataHandler,
  };

  return (
    <modelTreeContext.Provider value={treeContext}>
      {props.children}
    </modelTreeContext.Provider>
  );
}
