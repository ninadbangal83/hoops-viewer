import React, { Fragment, useContext } from "react";
import Communicator from "communicator"
import { getSelectConfigTreeNodes } from "../utils/activeConfigurationData";
import ConfigContext from "../store/context-store/configContext";
import IconBtn from "./UI/IconBtn";
import Box from "@mui/material/Box";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import styles from "../styles/VerticalToolbar.module.css";

// This component is use to add buttons in the vertical tool bar.
export default function VerticalToolbar(props) {
  const hwv = props.hwv;
  const configCtx = useContext(ConfigContext);

  return (
    <Fragment>
      <Box className={styles.verticalToolbarBox}>
        <IconBtn
          id={"modelBrowser"}
          name={"Model browser"}
          hwv={hwv}
          icon={<MenuIcon />}
          alignment={"vertical"}
          btnPosition={"rounded"}
          handleFunction={async () => {
            if (
              configCtx.selectedConfig !== null &&
              configCtx.isFirstConfigLoaded === false
            ) {
              await getSelectConfigTreeNodes(hwv, configCtx, configCtx.selectedConfig, Communicator);
              configCtx.setFirstConfig();
            }
          }}
          menuOptions={[
            {
              subName: "Model Tree",
              subIcon: <AccountTreeIcon />,
            },
            {
              subName: "Configurations",
              subIcon: <SettingsIcon />,
            },
          ]}
        />
      </Box>
    </Fragment>
  );
}
