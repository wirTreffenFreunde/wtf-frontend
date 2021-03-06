import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { Container, Typography, Card } from "@material-ui/core";

import Nav from "./Nav";
import InputContainer from "./InputContainer";
import InfoContainer from "./InfoContainer";
import AboutContainer from "./AboutContainer";
import Footer from "./Footer";
import MyAccount from "./MyAccount";
import LogIn from "./LogIn";
import Register from "./Register";
import Verification from "./Verification";
import Result from "./Result";
import Banner from "./Banner";
import ForgotPassword from "./ForgotPassword";
import NewPassword from "./NewPassword";

import "./App.css";
import { theme, useStyles } from "../Layout/useStyles";
import { MapProvider } from "../context/map-context";
import { UserProvider } from "../context/user-context";
import EmailVerified from "./EmailVerified";
import ResetSent from "./ResetSent";

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="false"
        disableGutters={true}
        className={classes.AppBody}
      >
        <MapProvider>
          <UserProvider>
            <Nav />
            <Router>
              <Switch>
                <Route exact path="/">
                  <Banner />
                  <Container maxWidth="lg">
                    <Card className={classes.cardInput} elevation="5">
                      <Typography variant="h4" className={classes.heading4}>
                        Find middle point to meet your friends
                      </Typography>
                      <Typography variant="h5" className={classes.heading5}>
                        Put addresses of your friends:
                      </Typography>
                      <InputContainer />
                    </Card>
                  </Container>
                  <InfoContainer />
                  <AboutContainer />
                </Route>
                <Route exact path="/result">
                  <Container maxWidth="lg">
                    <Card className={classes.cardInput}>
                      <InputContainer />
                    </Card>
                  </Container>
                  <Result />
                </Route>
                <Route exact path="/login" component={LogIn} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/verify" component={Verification} />
                <Route exact path="/myAccount" component={MyAccount} />
                <Route exact path="/reset-send" component={ResetSent} />
                <Route
                  exact
                  path="/reset-password/:resetPasswordToken"
                  component={NewPassword}
                />
                <Route path="/verified" component={EmailVerified} />

                <Route
                  exact
                  path="/forgot-password"
                  component={ForgotPassword}
                />
              </Switch>
            </Router>
            <Footer />
          </UserProvider>
        </MapProvider>
      </Container>
    </ThemeProvider>
  );
}

export default App;
