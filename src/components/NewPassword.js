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
import ForgotPassword from "./ForgotPassword";

export default function NewPassword(props) {
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
    data.token = props.match.params.resetPasswordToken;
    try {
      const response = await axios({
        method: "PUT",
        url: "http://localhost:8080/users/resetPassword",
        data: data,
      });

      //history.push("/myAccount");
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
          Reset Password
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="new-password"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                fullWidth
                label="New Password"
                autoComplete="new-password"
                type="password"
                autoFocus
              />
            )}
          />
          {/* {errors.email && <span>Please enter a valid email address</span>} */}

          <Controller
            name="confirm-new-password"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Confirm new Password"
                autoComplete="current-password"
                type="password"
              />
            )}
          />
          <Link href="/reset-password" variant="body2">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.submit}
            >
              Reset Password
            </Button>
          </Link>
        </form>
      </div>
    </Container>
  );
}
