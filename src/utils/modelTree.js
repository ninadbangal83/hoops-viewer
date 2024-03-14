let nodeNameList;
let nodeIdList;
let mainArr;
let treeNodesArr;

const updateList = (nodeId, nodeName) => {
  nodeNameList.push(nodeName);
  nodeIdList.push(nodeId);
};

// The below function generates and provide the Model Tree data in the form of Map.
const getModelTreeNodes = async (
  hwv,
  treeCtx,
  Communicator,
  search = false,
  searchNodeId
) => {
  nodeNameList = [];
  nodeIdList = [];
  mainArr = [];
  treeNodesArr = [];

  let rootNodeId;

  if (search === false) {
    rootNodeId = hwv.model.getAbsoluteRootNode();
    generateModelTreeData(rootNodeId);
  } else {
    rootNodeId = searchNodeId;
    generateModelTreeData(rootNodeId);
  }

  function generateModelTreeData(nodeId, object = null) {
    const nodeName = hwv.model.getNodeName(nodeId);
    const child = hwv.model.getNodeChildren(nodeId);
    updateList(nodeId, nodeName);

    let obj;
    if (hwv.model.getNodeType(nodeId) !== Communicator.NodeType.Pmi) {
      if (child.length !== 0) {
        obj = {
          value: nodeId.toString(),
          label: nodeName,
          children: [],
        };
      } else {
        obj = { value: nodeId.toString(), label: nodeName };
      }

      if (object !== null) {
        object.children.push(obj);
      }

      treeNodesArr.push(obj);
    }

    for (let i = 0; i < child.length; i++) {
      generateModelTreeData(child[i], obj);
    }
  }

  for (let i = 0; i < nodeNameList.length; i++) {
    mainArr.push([nodeIdList[i], nodeNameList[i]]);
  }
  let modelTreeData = new Map(mainArr);
  if (modelTreeData.length !== 0) {
    if (search === false) {
      treeCtx.addModelTreeData(hwv, modelTreeData);
      if (treeNodesArr[0] !== undefined) {
        treeCtx.addNewModelTreeData([treeNodesArr[0]]);
      }
    } else {
      if (treeNodesArr[0] !== undefined) {
        return [treeNodesArr[0]];
      }
      else {
        return undefined;
      }
    }
  }
};

export { getModelTreeNodes };
