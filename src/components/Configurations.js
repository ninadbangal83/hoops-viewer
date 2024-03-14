import React, { useContext } from "react";
import Communicator from "communicator"
import { getSelectConfigTreeNodes } from "../utils/activeConfigurationData";
import ConfigContext from "../store/context-store/configContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { StyledEngineProvider } from "@mui/styled-engine";
import "../styles/Configurations.css";

// This component is a stateless component.
// 1. It takes the Configurations list as props and displays the possible configurations in the configurations dropdown.
// 2. It renders different configurations on click.
export default function Configurations(props) {
  const { hwv, viewerDim } = props;
  const configCtx = useContext(ConfigContext);

  const handleChange = async (event) => {
    let id = event.target.value;
    hwv.model.activateCadConfiguration(Number(id));
    configCtx.addSelectedConfig(event.target.value);
    await getSelectConfigTreeNodes(hwv, configCtx, id, Communicator);
  };

  return (
    <StyledEngineProvider injectFirst>
      {configCtx.configArr.length !== 0 ? (
        <div
          className="rounded"
          style={{ backgroundColor: "white", paddingTop: "0.5rem" }}
        >
          <MenuItem
            sx={{
              width: `${(15 / 100) * 0.0625 * viewerDim.viewerWd}rem`,
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel id="config-label">Configurations</InputLabel>
              <Select
                labelId="config-label"
                id="configId"
                value={configCtx.selectedConfig}
                label="Configuration"
                onChange={handleChange}
                inputProps={{ IconComponent: () => null }}
              >
                {configCtx.configArr.map((e, i) => {
                  return (
                    <MenuItem value={e[1]} key={i} sx={{width: `${(5 / 100) * 0.0625 * viewerDim.viewerWd}rem`}}>
                      {e[0]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </MenuItem>
        </div>
      ) : (
        <div
          className="rounded"
          style={{ backgroundColor: "white", paddingTop: "0.5rem" }}
        >
          <MenuItem>No configurations found!</MenuItem>
        </div>
      )}
    </StyledEngineProvider>
  );
}
