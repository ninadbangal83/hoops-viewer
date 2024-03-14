import Communicator from "communicator";
// This components handle's and set the node data that is clicked.
// It gets triggered on right click mouse button.
export class ContextMenuOperator {
  constructor(
    viewer,
    showContextMenuHandler,
    contextMenuDataHandler,
    contextMenuPositionHandler,
    setModel
  ) {
    this.viewer = viewer;
    this.showContextMenuHandler = showContextMenuHandler;
    this.contextMenuDataHandler = contextMenuDataHandler;
    this.contextMenuPositionHandler = contextMenuPositionHandler;
    this.setModel = setModel;
  }

  async onMouseDown(event) {
    if (event._button === 2) {
      this.handleNodeData(event.getPosition());
    } else {
      this.showContextMenuHandler({ isVisible: false });
      this.contextMenuDataHandler({ nodeId: "", nodeName: "" });
    }
  }

  async handleNodeData(position) {
    const model = this.viewer.model;

    const config = new Communicator.PickConfig(Communicator.SelectionMask.Face);
    const selectionItem = await this.viewer.view.pickFromPoint(
      position,
      config
    );

    if (selectionItem === null || !!selectionItem.overlayIndex()) {
      return;
    }

    const nodeId = selectionItem.getNodeId();
    const selectionPosition = selectionItem.getPosition();
    const faceEntity = selectionItem.getFaceEntity();

    if (nodeId === null || selectionPosition === null || faceEntity === null) {
      this.contextMenuDataHandler({ nodeId: null, nodeName: null });
      this.contextMenuPositionHandler(position);

      await this.showContextMenuHandler({ isVisible: true });
      return;
    }

    const parentNodeId = model.getNodeParent(nodeId);
    if (parentNodeId === null) {
      return;
    }

    const parentNodeName = model.getNodeName(parentNodeId);
    if (parentNodeName === null) {
      return;
    }

    const nodeName = model.getNodeName(nodeId);
    if (nodeName === null) {
      return;
    } else {
      const data = this.viewer.view.projectPoint(faceEntity.toJson().position);

      this.showContextMenuHandler({ isVisible: true });
      this.contextMenuPositionHandler(data);
      this.contextMenuDataHandler({
        nodeId: parentNodeId,
        nodeName: parentNodeName,
      });
      this.setModel(model);
    }
  }
}
