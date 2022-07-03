import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { CardContent, Tabs } from "@material-ui/core";
import { flexbox } from "@mui/system";
import Abilities from "../pages/Abilities";

function Pokedetails() {
  return (
    <div>
      <Abilities />
    </div>
  );
}

export default Pokedetails;
