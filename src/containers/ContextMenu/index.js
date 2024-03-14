import React from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import FlipIcon from "@mui/icons-material/Flip";
import { Isolate } from "../../utils/Icons";
import {
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  CardContent,
  Card,
  Tooltip,
  Typography,
  StyledEngineProvider,
} from "@mui/material";
import styles from "../../styles/ContextMenu.module.css";

// This is stateless reusable component is used to dispaly and operations different functionalities
// on the clicked model part.
export default function ContextMenu(props) {
  const {
    model,
    hwv,
    nodeId,
    nodeName,
    top,
    left,
    isIsolate,
    hideCount,
    transparentCount,
    isZoom,
    isolateToggleHandler,
    hideCountIncHandler,
    hideCountInitHandler,
    showContextMenuHandler,
    contextMenuDataHandler,
    contextMenuPositionHandler,
    transparentCountIncHandler,
    transparentCountInitHandler,
    zoomHandler,
  } = props;

  return (
    <StyledEngineProvider injectFirst>
      <Paper
        className={styles.contextMenu}
        sx={{
          top: `${top * 0.063}rem`,
          left: `${left * 0.063}rem`,
        }}
      >
        <Card>
          <CardContent className={styles.cardContent}>
            <Typography className={styles.nodeId}>
              Node Id - {nodeId ? nodeId : "Nil"}
            </Typography>
            <Tooltip
              title={nodeName ? nodeName : "Nil"}
              placement="top"
              arrow={true}
            >
              <Typography
                // paragraph
                className={styles.nodeName}
              >
                Node Name - {nodeName ? nodeName : "Nil"}
              </Typography>
            </Tooltip>
          </CardContent>
          <ListItemIcon
            className={styles.closeIcon}
            onClick={() => {
              showContextMenuHandler(false);
            }}
          >
            <CloseIcon className={styles.icon} />
          </ListItemIcon>
        </Card>
        {(isIsolate === true && nodeId === null) ||
        (hideCount > 0 && nodeId === null) ||
        (transparentCount > 0 && nodeId === null) ||
        (isZoom === true && nodeId === null) ? (
          <MenuList className={styles.menuList}>
            <hr className={styles.divider} />
            <MenuItem
              className={styles.menuItem}
              onClick={() => {
                if (isIsolate) {
                  isolateToggleHandler();
                }
                hideCountInitHandler();
                hwv.model.resetNodesVisibility();
                hwv.model.resetModelOpacity();
                hwv.view.resetCamera();
                contextMenuDataHandler({ nodeId: null, nodeName: null });
                contextMenuPositionHandler({});
                transparentCountInitHandler();
                zoomHandler(false);
                showContextMenuHandler({ isVisible: false });
              }}
            >
              <ListItemText className={styles.listItemText}>
                Show all
              </ListItemText>
              <ListItemIcon>
                <RotateLeftIcon className={styles.icon} />
              </ListItemIcon>
            </MenuItem>
          </MenuList>
        ) : (
          <MenuList className={styles.menuList}>
            <hr className={styles.divider} />
            <MenuItem
              className={styles.menuItem}
              onClick={() => {
                model.setNodesVisibility([nodeId], false);
                hideCountIncHandler();
                showContextMenuHandler({ isVisible: false });
              }}
            >
              <ListItemText className={styles.listItemText}>Hide</ListItemText>
              <ListItemIcon>
                <VisibilityOffIcon className={styles.icon} />
              </ListItemIcon>
            </MenuItem>
            <hr className={styles.divider} />
            <MenuItem
              className={styles.menuItem}
              onClick={() => {
                hwv.view.isolateNodes([nodeId]);

                isolateToggleHandler();
                showContextMenuHandler({ isVisible: false });
              }}
            >
              <ListItemText className={styles.listItemText}>
                Isolate
              </ListItemText>
              <ListItemIcon>
                <Isolate className={styles.icon} />
              </ListItemIcon>
            </MenuItem>
            <hr className={styles.divider} />{" "}
            <MenuItem
              className={styles.menuItem}
              onClick={() => {
                transparentCountIncHandler();
                model.setNodesOpacity([nodeId], 0.5);
                showContextMenuHandler({ isVisible: false });
              }}
            >
              <ListItemText className={styles.listItemText}>
                Transparent
              </ListItemText>
              <ListItemIcon>
                <FlipIcon className={styles.icon} />
              </ListItemIcon>
            </MenuItem>
            <hr className={styles.divider} />{" "}
            <MenuItem
              className={styles.menuItem}
              onClick={() => {
                zoomHandler(true);
                model.getNodesBounding([nodeId]).then(function (boundingBox) {
                  hwv.view.fitBounding(boundingBox);
                });
                showContextMenuHandler({ isVisible: false });
              }}
            >
              <ListItemText className={styles.listItemText}>Zoom</ListItemText>
              <ListItemIcon>
                <ZoomInIcon className={styles.icon} />
              </ListItemIcon>
            </MenuItem>
          </MenuList>
        )}
      </Paper>
    </StyledEngineProvider>
  );
}
