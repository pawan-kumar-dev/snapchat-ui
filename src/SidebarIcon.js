import { IconButton, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  icons: {
    color: "white",
    fontSize: "20px",
  },
});
const SidebarIcon = ({ Icon }) => {
  const classes = useStyles();
  return (
    <IconButton className={classes.icons}>
      <Icon />
    </IconButton>
  );
};

export default SidebarIcon;
