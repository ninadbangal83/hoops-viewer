import React, { Fragment, useState, useContext } from "react";
import Communicator from "communicator";
import Search from "../../components/UI/SearchBar";
import { MenuItem } from "@mui/material";
import "../../styles/ModelTree.css";
import { StyledEngineProvider } from "@mui/styled-engine";
import ConfigContext from "../../store/context-store/configContext";
import ModleTreeContext from "../../store/context-store/modelTreeContext";
import NewModelTree from "./NewModelTree";
import { getSelectConfigTreeNodes } from "../../utils/activeConfigurationData";
import { getModelTreeNodes } from "../../utils/modelTree";

// This component displays the Model Tree and Search Bar
// and handle's the Tree Nodes's searching functionality in the Model Tree Browser.
export default function ModelTree({ hwv, viewerDim }) {
  const configCtx = useContext(ConfigContext);
  const modelTreeCtx = useContext(ModleTreeContext);
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [searchNodesList, setSearchNodesList] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");

  const searchHandler = async () => {
    let searchResult = [];
    let searchNodes = [];
    let modelTreeArr;

    setSearchMessage("");
    if (search !== "") {
      if (configCtx.selectedConfig === null) {
        modelTreeArr = modelTreeCtx.modelTreeDataArr;
      } else {
        modelTreeArr = configCtx.selectedConfigTreeDataArr;
      }

      modelTreeArr.forEach((node) => {
        if (node.nodeName.toLowerCase().includes(search.toLowerCase())) {
          searchResult.push(node.nodeId);
        }
      });


      if (configCtx.selectedConfig === null) {
        searchResult.forEach(async (e, i) => {
          let data = await getModelTreeNodes(
            hwv,
            modelTreeCtx,
            Communicator,
            true,
            e
          );
          searchNodes.push(data);

          if (i === searchResult.length - 1) {
            setSearchNodesList(searchNodes);
          }
        });
      } else {
        searchResult.forEach(async (e, i) => {
          let data = await getSelectConfigTreeNodes(
            hwv,
            configCtx,
            null,
            Communicator,
            true,
            e
          );
          searchNodes.push(data);

          if (i === searchResult.length - 1) {
            setSearchNodesList(searchNodes);
          }
        });
      }

      if (searchResult.length === 0) {
        setSearchMessage("Search not found!");

        setSearchNodesList(searchNodes);

        setIsSearch(false);
        // alert("Search not found!");
        return;
      }
    } else {
      setSearchMessage("Search is empty!");

      setSearchNodesList(searchNodes);
      setIsSearch(false);
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <Fragment>
        <div
          className="rounded"
          style={{ backgroundColor: "white", paddingTop: "0.5rem" }}
        >
          <Search
            search={search}
            setSearch={setSearch}
            isSearch={isSearch}
            setIsSearch={setIsSearch}
            searchHandler={searchHandler}
            setSearchList={setSearchList}
            setSearchMessage={setSearchMessage}
            width={{ value: `${(15 / 100) * 0.0625 * viewerDim.viewerWd}rem` }}
          />
          <MenuItem
            style={{
              flexGrow: 1,
              height: `${(60 / 100) * 0.0625 * viewerDim.viewerHt}rem`,
              width: `${(17.5 / 100) * 0.0625 * viewerDim.viewerWd}rem`,
              backgroundColor: "white",
              // overflow: "scroll",
              overflowY: "auto",
              overflowX: "auto",
              alignItems: "baseline",
            }}
          >
            <ul className="searchList">
              {isSearch ? (
                searchNodesList.map((searchNode, i) => {
                  return (
                    <Fragment>
                      <li>
                        <NewModelTree
                          hwv={hwv}
                          viewerDim={viewerDim}
                          searchNode={searchNode}
                          isSearch={isSearch}
                        />
                      </li>
                    </Fragment>
                  );
                })
              ) : (
                <li>
                  <NewModelTree
                    hwv={hwv}
                    viewerDim={viewerDim}
                    searchNode={null}
                    isSearch={isSearch}
                  />
                </li>
              )}
            </ul>
            <div>{searchMessage}</div>
          </MenuItem>
        </div>
      </Fragment>
    </StyledEngineProvider>
  );
}
