import React, { useState, Fragment } from "react";
import { handlePmis } from "../utils/annotations";
import {
  calculateLength,
  calculateAngle,
  removeMeasurements,
} from "../utils/measurement";
import { spin, turnable, walk } from "../utils/orbitView"
import { stopExplosion, setMagnitude } from "../utils/explode"
import IconBtn from "./UI/IconBtn";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StraightenIcon from "@mui/icons-material/Straighten";
import ScaleIcon from "@mui/icons-material/Scale";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import styles from "../styles/HorizontalToolbar.module.css";

// This component is use to add buttons in the horizontal tool bar.
export default function HorizontalToolbar(props) {
  const hwv = props.hwv;

  const [orbitIcon, setOrbitIcon] = useState(
    <RadioButtonUncheckedIcon
      sx={{
        color: "black",
      }}
    />
  );
  const [measurementIcon, setMeasurementIcon] = useState(<StraightenIcon />);
  const [visibleIcon, setVisibleIcon] = useState(
    hwv.model.getNodeVisibility(parseInt(Object.keys(hwv.model.getPmis())[0]))
      ? {
          icon: <VisibilityIcon />,
          visible: true,
        }
      : {
          icon: <VisibilityOffIcon />,
          visible: false,
        }
  );

  const handleHome = async () => {
    hwv.view.resetCamera(750);
    removeMeasurements(hwv);
    spin(hwv)
  };

  return (
    <Fragment>
      <Box className={styles.horizontalToolbarBox}>
        <IconBtn
          id={"home"}
          name={"Home View"}
          hwv={hwv}
          handleFunction={handleHome}
          btnPosition={"start"}
          icon={
            <HomeIcon
              sx={{
                color: "black",
              }}
            />
          }
          alignment={"horizontal"}
        />

        <IconBtn
          id={"orbit"}
          name={"Orbit View"}
          hwv={hwv}
          icon={orbitIcon}
          setIcon={setOrbitIcon}
          alignment={"horizontal"}
          menuOptions={[
            {
              subName: "Orbit",
              subIcon: <RadioButtonUncheckedIcon />,
              func: spin,
            },
            { subName: "Turnable", subIcon: <ThreeSixtyIcon />, func: turnable },
            { subName: "Walk", subIcon: <SwapVertIcon />, func: walk },
          ]}
        />

        <IconBtn
          id={"explode"}
          name={"Explode"}
          hwv={hwv}
          icon={<ControlCameraIcon />}
          alignment={"horizontal"}
          menuOptions={[
            { subName: "Explosion Magnitude", subIcon: null, func: setMagnitude },
            { subName: "Stop", subIcon: <ClearIcon />, func: stopExplosion },
          ]}
        />

        <IconBtn
          id={"measurement"}
          name={"Measurement"}
          hwv={hwv}
          icon={measurementIcon}
          setIcon={setMeasurementIcon}
          alignment={"horizontal"}
          menuOptions={[
            {
              subName: "Length",
              subIcon: <StraightenIcon />,
              func: calculateLength,
            },
            {
              subName: "Angle",
              subIcon: <ScaleIcon />,
              func: calculateAngle,
            },
            {
              subName: "Clear",
              subIcon: <ClearIcon />,
              func: removeMeasurements,
            },
          ]}
        />

        <IconBtn
          id={"annotations"}
          name={"Annotations"}
          hwv={hwv}
          icon={visibleIcon.icon}
          btnPosition={"end"}
          handleFunction={() => {
            let iconData = handlePmis(hwv, visibleIcon);
            setVisibleIcon(iconData);
          }}
          alignment={"horizontal"}
        />
      </Box>
    </Fragment>
  );
}
