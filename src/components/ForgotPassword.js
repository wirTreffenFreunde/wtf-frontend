import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStyles } from "../Layout/useStyles";
import axios from "axios";
const backendURL = process.env.REACT_APP_BACKEND_URL
export default function ForgotPassword() {
  let history = useHistory();
  const classes = useStyles();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // e.preventDefault();
    try {
      const result = await axios.post(
        `${backendURL}/users/forgotpassword`,
        data
      );
      if (result.status === 200) {
        history.push("/reset-send");
      }
    } catch (e) {
      console.log(e);
    }
  };

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
                required
              />
            )}
          />
          {errors.email && <span>Please enter a valid email address</span>}
          <Link href="/reset-password" variant="body2">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
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
