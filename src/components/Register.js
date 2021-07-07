import { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useForm, Controller } from "react-hook-form";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'; 
import ListItemText from '@material-ui/core/ListItemText'; 

import axios from "axios";
import useStyles from "../Layout/useStyles";

import { useUserContext } from "../context/user-context";
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

  const submit = async (data) => {
    // e.preventDefault();
    try {
      const result = await axios.post("/users", data);
      if (result.status === 200) {
        history.push("/");
      }
    } catch (e) {
      console.log("@", e);
      setWrongInput(e);
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
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Email Address"
                    pattern={{
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                    }}
                    autoComplete="email"
                    autoFocus
                  />
                )}
              />
            </Grid> 
            <Grid item xs={12} sm={6}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Password"
                    
                    type="password"
                    autoFocus
                    minLength={{ value: 5, message: "min length is 5" }}
                  />
                )}
              />
            </Grid> 
             
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I agree to receive promotions via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign up
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
