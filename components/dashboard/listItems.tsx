import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";

import Link from "next/link";
const links = [
  {
    title: "Splash Page",
    href: "/",
    icon: <LayersIcon />,
  },
  {
    title: "Dashboard",
    href: "/app",
    icon: <DashboardIcon />,
  },
  {
    title: "Log In",
    href: "/login",
    icon: <PeopleIcon />,
  },
  {
    title: "Sign Up",
    href: "/signup",
    icon: <AssignmentIcon />,
  },
];
export const mainListItems = (
  <div>
    {links.map(link => (
      <Link href={link.href} key={link.title}>
        <ListItem button>
          <ListItemIcon>{link.icon}</ListItemIcon>
          <ListItemText primary={link.title} />
        </ListItem>
      </Link>
    ))}
  </div>
);
