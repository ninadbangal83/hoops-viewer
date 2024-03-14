import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// This functions handles data related to the Annotations.
const handlePmis = (hwv, visibleIcon) => {
  let iconData;
  if (visibleIcon.visible) {
    iconData = { icon: <VisibilityOffIcon />, visible: false };
    setPmis(hwv, false);
  } else {
    iconData = { icon: <VisibilityIcon />, visible: true };
    setPmis(hwv, true);
  }

  return iconData;
};

const setPmis = (hwv, visible) => {
  let pmiMap = hwv.model.getPmis();

  let nodeIdArray = Object.keys(pmiMap);

  nodeIdArray.forEach((e) => {
    let nodeId = parseInt(e);
    hwv.model.setNodesVisibility([nodeId], visible);
  });
};

export { handlePmis, setPmis };
