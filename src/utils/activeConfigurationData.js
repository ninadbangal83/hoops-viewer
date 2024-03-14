let nodeNameList;
let nodeIdList;
let mainConfigArr;
let configArr;

const updateList = (nodeId, nodeName) => {
  nodeNameList.push(nodeName);
  nodeIdList.push(nodeId);
};

// The below function generates and provide the active configuration Tree data in the form of Map.
const getSelectConfigTreeNodes = async (
  hwv,
  configCtx,
  id = null,
  Communicator,
  search = false,
  searchNodeId
) => {
  nodeNameList = [];
  nodeIdList = [];
  mainConfigArr = [];
  configArr = [];

  const configData = configCtx.configNodeIds;
  const activeConfig = configCtx.selectedConfig;
  let rootNodeId;

  if (search === false) {
    rootNodeId = hwv.model.getAbsoluteRootNode();
    generateSelectedConfigTreeData(rootNodeId);
  } else {
    rootNodeId = searchNodeId;
    generateSelectedConfigTreeData(rootNodeId);
  }

  function generateSelectedConfigTreeData(nodeId, object = null) {
    const nodeName = hwv.model.getNodeName(parseInt(nodeId));
    const child = hwv.model.getNodeChildren(parseInt(nodeId));
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
        obj = { value: nodeId, label: nodeName };
      }

      if (object !== null) {
        object.children.push(obj);
      }

      configArr.push(obj);
    }

    for (let i = 0; i < child.length; i++) {
      if (id === null) {
        if (
          configData.includes(child[i].toString()) &&
          child[i].toString() !== activeConfig
        ) {
          continue;
        } else {
          generateSelectedConfigTreeData(child[i], obj);
        }
      } else {
        if (
          configData.includes(child[i].toString()) &&
          child[i].toString() !== id.toString()
        ) {
          continue;
        } else {
          generateSelectedConfigTreeData(child[i], obj);
        }
      }
    }
  }

  for (let i = 0; i < nodeNameList.length; i++) {
    mainConfigArr.push([nodeIdList[i], nodeNameList[i]]);
  }

  let selectedConfigTreeData = new Map(mainConfigArr);
  if (selectedConfigTreeData.length !== 0) {
    if (search === false) {
      configCtx.addSelectedConfigTreeData(hwv, selectedConfigTreeData);
      configCtx.addNewConfigArr([configArr[0]]);
    } else {
      return [configArr[0]];
    }
  }
};

export { getSelectConfigTreeNodes };
