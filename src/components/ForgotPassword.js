import React from "react";
import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useStyles } from "../Layout/useStyles";
import { accessToken } from "mapbox-gl";
import { useUserContext } from "../context/user-context";

export default function ForgotPassword() {
  let history = useHistory();
  const classes = useStyles();

  const { user, setUser } = useUserContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [wrongCredentials, setWrongCredentials] = useState(false);
  async function onSubmit(data) {
    try {
      const response = await axios({
        method: "POST",
        url: "/users/login",
        data: data,
      });
      setWrongCredentials(false);
      const accessToken = response.data.accessToken;
      axios.defaults.headers.common["authorization"] = `basic ${accessToken}`;

      setUser({ email: data.email });

      if (data["remember-me"]) {
        localStorage.setItem("token", accessToken);
      } else sessionStorage.setItem("token", accessToken);
      console.log(accessToken);
      history.push("/forgotPassword");
    } catch (error) {
      if (error.response.status === "404") setWrongCredentials(true);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email Address"
                autoComplete="email"
                autoFocus
              />
            )}
          />
          {/* {errors.email && <span>Please enter a valid email address</span>} */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            className={classes.submit}
          >
            Retrieve  Password
          </Button>

          {/* <Grid container>
            <Grid item xs>
              <Link href="forgotpassword" variant="body2">
                Forgot password ?
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
    </Container>
  );
}
