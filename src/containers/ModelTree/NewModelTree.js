import React, { useState, useContext, Fragment } from "react";
import Communicator from "communicator";
import ConfigContext from "../../store/context-store/configContext";
import ModelTreeContext from "../../store/context-store/modelTreeContext";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import "../../styles/CheckboxTree.css";
import { useEffect } from "react";

export default function NewModelTree(props) {
  const { hwv, searchNode, isSearch } = props;
  const configCtx = useContext(ConfigContext);
  const treeCtx = useContext(ModelTreeContext);

  const [nodes, setNodes] = useState(
    isSearch
      ? searchNode
      : configCtx.newConfigArr.length !== 0
      ? configCtx.newConfigArr
      : treeCtx.newModelTreeData
  );

  const [nodeIds, setnodeIds] = useState(
    configCtx.selectedConfigNodeIds.length !== 0
      ? configCtx.selectedConfigNodeIds
      : treeCtx.modelTreeNodeIds
  );

  const [checked, setChecked] = useState(
    treeCtx.checkedNodes.length !== 0
      ? treeCtx.checkedNodes
      : configCtx.selectedConfigNodeIds.length !== 0
      ? configCtx.selectedConfigNodeIds
      : treeCtx.modelTreeNodeIds
  );

  const [expanded, setExpanded] = useState([]);
  const [searchIds, setSearchIds] = useState([]);

  let searchNodeIds = [];

  useEffect(() => {
    console.log("error");
    console.log(treeCtx.checkedNodes);
    console.log(nodeIds);
    console.log(checked);
    console.log(configCtx.selectedConfig);
    if (configCtx.selectedConfig !== null) {
      if (treeCtx.checkedNodes.length !== 0) {
        hideShow(nodeIds);
      } else {
        hideShow([]);
        setChecked([]);
      }
    } else {
      if (treeCtx.checkedNodes.length !== 0) {
        hideShow(treeCtx.checkedNodes);
      } else {
        hideShow([]);
        setChecked([]);
      }
    }
  }, []);

  useEffect(() => {
    if (isSearch === false) {
      hwv.model.setNodesVisibility(treeCtx.checkedNodes, true);
    }

    if (isSearch === true && nodes !== undefined) {
      let nodeId = parseInt(nodes[0].value);
      generateNodeIdArr(nodeId);
      setSearchIds(searchNodeIds);
    }
  }, [isSearch]);

  async function hideShow(nodeId) {
    await hwv.model.setNodesVisibility(nodeIds, false);
    await hwv.model.setNodesVisibility(nodeId, true);
  }

  function generateNodeIdArr(nodeId) {
    const child = hwv.model.getNodeChildren(nodeId);

    if (hwv.model.getNodeType(nodeId) !== Communicator.NodeType.Pmi) {
      if (!searchNodeIds.includes(nodeId)) {
        searchNodeIds.push(nodeId);
      }
    }

    for (let i = 0; i < child.length; i++) {
      generateNodeIdArr(child[i]);
    }
  }

  const getParents = (nodeId, parentIds = []) => {
    const parent = hwv.model.getNodeParent(nodeId);
    if (parent !== null) {
      parentIds.push(parent);
      getParents(parent, parentIds);
    }
    return parentIds;
  };

  return (
    <Fragment>
      {nodes !== undefined ? (
        <CheckboxTree
          nodes={nodes}
          checked={checked}
          expanded={expanded}
          onCheck={async (checked) => {
            var numberArray = [];
            for (var i = 0; i < checked.length; i++) {
              numberArray.push(parseInt(checked[i]));
            }
            if (isSearch) {
              let treeCheckedNodes = treeCtx.checkedNodes;
              if (numberArray.length !== 0) {
                let nodeIdsStr = [];

                const min = Math.min(...numberArray);

                let parentIds = getParents(min);

                let resultIds = treeCheckedNodes.filter(
                  (nodeId) => !parentIds.includes(nodeId)
                );
                let arr = searchIds.filter((x) => !numberArray.includes(x));

                numberArray.forEach((nodeId) => {
                  if (!resultIds.includes(nodeId)) {
                    resultIds.push(nodeId);
                  }
                });

                let finalResultIds = resultIds.filter(
                  (nodeId) => !arr.includes(nodeId)
                );

                for (var j = 0; j < finalResultIds.length; j++) {
                  nodeIdsStr.push(finalResultIds[j].toString());
                }

                treeCtx.setCheckedNodes(finalResultIds);
                setChecked(nodeIdsStr);
                hideShow(finalResultIds);
              } else {
                let nodeIdsStr = [];

                const min = Math.min(...searchIds);

                let parentIds = getParents(min);

                let resultIds = treeCheckedNodes.filter(
                  (nodeId) =>
                    !searchIds.includes(nodeId) && !parentIds.includes(nodeId)
                );

                for (var k = 0; k < resultIds.length; k++) {
                  nodeIdsStr.push(resultIds[k].toString());
                }

                treeCtx.setCheckedNodes(resultIds);
                setChecked(nodeIdsStr);
                hideShow(resultIds);
              }
            } else {
              treeCtx.setCheckedNodes(numberArray);
              setChecked(checked);
              hideShow(numberArray);
            }
          }}
          onExpand={(expanded) => setExpanded(expanded)}
          showNodeIcon={false}
          checkModel="all"
          onClick={(e) => {
            hwv.selectPart(parseInt(e.value));
          }}
          expandOnClick={true}
          nativeCheckboxes={true}
          iconsClass="fa5"
          icons={{
            check: <span className="rct-icon rct-icon-check" />,
            uncheck: <span className="rct-icon rct-icon-uncheck" />,
            halfCheck: <span className="rct-icon rct-icon-half-check" />,
            expandClose: <span className="rct-icon rct-icon-expand-close" />,
            expandOpen: <span className="rct-icon rct-icon-expand-open" />,
            expandAll: <span className="rct-icon rct-icon-expand-all" />,
            collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
            parentClose: <span className="rct-icon rct-icon-parent-close" />,
            parentOpen: <span className="rct-icon rct-icon-parent-open" />,
            leaf: <span className="rct-icon rct-icon-leaf" />,
          }}
        />
      ) : (
        ""
      )}
    </Fragment>
  );
}
