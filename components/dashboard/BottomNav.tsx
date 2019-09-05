import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PlusIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";
import theme from "../theme";

const useStyles = makeStyles({
  root: {
    width: "100%",
    // position: "fixed",
  },
});

export default function SimpleBottomNavigation({
  value,
  setValue,
}: {
  value: number;
  setValue: (number) => void;
}) {
  const classes = useStyles(theme);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}>
      <BottomNavigationAction icon={<HomeIcon />} />
      <BottomNavigationAction icon={<SearchIcon />} />
      <BottomNavigationAction icon={<PlusIcon />} />
      <BottomNavigationAction icon={<NotificationsIcon />} />
      <BottomNavigationAction icon={<PersonIcon />} />
    </BottomNavigation>
  );
}
