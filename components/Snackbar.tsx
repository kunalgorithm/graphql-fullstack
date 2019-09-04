import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import theme from "./theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5),
    },
  })
);

export default function SimpleSnackbar({ message }: { message: string }) {
  const classes = useStyles(theme);
  const [open, setOpen] = useState(true);

  return (
    // <div>
    //   <Button onClick={() => setOpen(true)}>Open simple snackbar</Button>
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
      ContentProps={{
        "aria-describedby": "message-id",
      }}
      message={<span id="message-id">{message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>,
      ]}
    />
    // </div>
  );
}
