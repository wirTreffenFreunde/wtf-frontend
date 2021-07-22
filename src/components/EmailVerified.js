import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useStyles } from "../Layout/useStyles";
export default function EmailVerified() {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [verify, setVerify] = useState(false);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h3" variant="h5">
          Your email is verified. Proceed to login.
        </Typography>
      </div>
    </Container>
  );
}
