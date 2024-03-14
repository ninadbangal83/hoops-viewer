import * as React from "react";
import Box from "@mui/material/Box";
import styles from "../../styles/CircularIndeterminate.module.css";

// This component is a stateless reusable component
// It display's the "Model not found!", "Config not found!" message based on conditions.
export default function ModuleNotFound(props) {
  return (
    <Box className={styles.spinnerBox}>
      <span style={{ margin: "auto auto" }}>
        <div>{props.isModuleFound.message}</div>
      </span>
    </Box>
  );
}
