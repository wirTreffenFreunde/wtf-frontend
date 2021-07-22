import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import Link from "@material-ui/core/Link";

import { useForm, Controller } from "react-hook-form";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import axios from "axios";
import { useStyles } from "../Layout/useStyles";

//import { useUserContext } from "../context/user-context";
import Copyright from "../Layout/Copyright";

export default function Register() {
  let history = useHistory();
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [wrongInput, setWrongInput] = useState(false);

  // const showMessage = () => {
  //   // e.preventDefault()
  //   setVerify(true);
  // };

  const submit = async (data) => {
    // e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8080/users", data);
      if (result.status === 200) {
        history.push("/verify");
      }
    } catch (e) {
      console.log("@", e);
      setWrongInput(e);
      // showMessage();
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
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(submit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    display="inline"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="First Name"
                    autoComplete="fname"
                    autoFocus
                  />
                )}
              />
              {errors.firstName && <span>First name is required</span>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    display="flex"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Last Name"
                    autoComplete="lname"
                    autoFocus
                  />
                )}
              />
              {errors.lastName && <span>Last name is required</span>}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    display="flex"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                  />
                )}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message:
                      "Password should contain small character,big character,special character,a number and needs to be at least 8 characters long",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    display="flex"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    autoFocus
                  />
                )}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="retype-password"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message:
                      "Password should contain small character,big character,special character,a number and needs to be at least 8 characters long",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    display="inline-flex"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Retype-Password"
                    type="password"
                    autoFocus
                  />
                )}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I agree to receive promotions via email."
              />
            </Grid>
          </Grid>
          {wrongInput && <p>Email already exists, MATE!</p>}
          <Link href="/verify" variant="body2">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign up
            </Button>
          </Link>
          {/* {verify && <p>Please verify your Email</p>} */}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
