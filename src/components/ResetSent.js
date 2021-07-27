import React from "react";
import { Avatar, Container, CssBaseline, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { useStyles } from "../Layout/useStyles";

export default function ResetSent() {
  const classes = useStyles();

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          We have sent a link to your email address for resetting password.
        </Typography>
      </div>
    </Container>
  );
}
