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
import axios from "axios";
import { useStyles } from "../Layout/useStyles";
import { hashPassword } from "../crypto";
const backendURL = process.env.REACT_APP_BACKEND_URL

export default function NewPassword(props) {
  let history = useHistory();
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  async function onSubmit(data) {
    data.token = props.match.params.resetPasswordToken;
    data.password = hashPassword(data.password);
    data["confirm-new-password"] = hashPassword(data["confirm-new-password"]);
    try {
      const response = await axios({
        method: "PUT",
        url: `${backendURL}/users/resetPassword`,
        data: data,
      });

      history.push("/login");
    } catch (error) {
      console.error(error);
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
