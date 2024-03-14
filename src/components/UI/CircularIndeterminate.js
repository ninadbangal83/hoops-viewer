import * as React from "react";
import Box from "@mui/material/Box";
import styles from "../../styles/CircularIndeterminate.module.css";

// This compoent is stateless reusable component.
// It displays the "loading..." Message.
export default function CircularIndeterminate() {
  return (
    <Box className={styles.spinnerBox}>
      <span style={{ margin: "auto auto" }}>
        {/* <CircularProgress /> */}
        <div>Loading model...</div>
      </span>
    </Box>
  );
}
