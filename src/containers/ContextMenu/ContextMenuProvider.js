import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContextMenu from ".";
import { contextMenuActions } from "../../store/redux-store/contextMenu";
import { featuresActions } from "../../store/redux-store/contextMenuFeatures";

// This component provides node's data that is clicked
// and functions to manage data to the contextMenu component.
export default function ContextMenuProvider(props) {
  const { model, hwv } = props;
  const dispatch = useDispatch();

  const isIsolate = useSelector((state) => state.features.isIsolate);
  const hideCount = useSelector((state) => state.features.hideCount);
  const transparentCount = useSelector(
    (state) => state.features.transparentCount
  );
  const isZoom = useSelector((state) => state.features.isZoom);

  const showContextMenu = useSelector(
    (state) => state.contextMenu.showContextMenu
  );
  const contextMenuData = useSelector(
    (state) => state.contextMenu.contextMenuData
  );
  const contextMenuPosition = useSelector(
    (state) => state.contextMenu.contextMenuPosition
  );

  const isolateToggleHandler = () => {
    dispatch(featuresActions.isolateToggle());
  };

  const hideCountIncHandler = () => {
    dispatch(featuresActions.hideCountInc());
  };

  const hideCountInitHandler = () => {
    dispatch(featuresActions.hideCountInit());
  };

  const showContextMenuHandler = (visibility) => {
    dispatch(contextMenuActions.setVisibility(visibility));
  };

  const contextMenuDataHandler = (data) => {
    dispatch(contextMenuActions.setData(data));
  };

  const contextMenuPositionHandler = (position) => {
    dispatch(contextMenuActions.setPosition(position));
  };

  const transparentCountIncHandler = () => {
    dispatch(featuresActions.transparentCountInc());
  };

  const transparentCountInitHandler = () => {
    dispatch(featuresActions.transparentCountInit());
  };

  const zoomHandler = (isZoom) => {
    dispatch(featuresActions.setZoom(isZoom));
  };
  return (
    <Fragment>
      {showContextMenu.isVisible ? (
        isIsolate === false &&
        hideCount === 0 &&
        transparentCount === 0 &&
        isZoom === false &&
        contextMenuData.nodeId === null ? (
          ""
        ) : (
          <ContextMenu
            model={model}
            hwv={hwv}
            nodeId={contextMenuData.nodeId}
            nodeName={contextMenuData.nodeName}
            top={contextMenuPosition.y}
            left={contextMenuPosition.x}
            isIsolate={isIsolate}
            hideCount={hideCount}
            transparentCount={transparentCount}
            isZoom={isZoom}
            isolateToggleHandler={isolateToggleHandler}
            hideCountIncHandler={hideCountIncHandler}
            hideCountInitHandler={hideCountInitHandler}
            showContextMenuHandler={showContextMenuHandler}
            contextMenuDataHandler={contextMenuDataHandler}
            contextMenuPositionHandler={contextMenuPositionHandler}
            transparentCountIncHandler={transparentCountIncHandler}
            transparentCountInitHandler={transparentCountInitHandler}
            zoomHandler={zoomHandler}
          />
        )
      ) : (
        ""
      )}
    </Fragment>
  );
}
