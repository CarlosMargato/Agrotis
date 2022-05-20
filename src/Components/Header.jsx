import React from "react";
import { ReactComponent as Agrotis } from "../Assets/Agrotis.svg";
import {
  AppBar,
  Box,
  createStyles,
  makeStyles,
  Paper,
  Toolbar,
} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    logo: {
      height: 14,
      width: 74,
    },
    paper: {
      width: "100%",
    },
  })
);

function Header() {
  const styles = useStyles();
  return (
    <Paper className={styles.paper}>
      <Box container direction="column">
        <Toolbar
          display="flex"
          style={{
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Agrotis
            className={styles.logo}
            // alt="Logo da empresa Agrotis"
          />
        </Toolbar>
      </Box>
    </Paper>
  );
}

export default Header;
