import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { Container, Typography, Box } from "@material-ui/core";
import Nav from "./Nav";
import InputContainer from "./InputContainer";
import InfoContainer from "./InfoContainer";
import AboutContainer from "./AboutContainer";
import Footer from "./Footer";
import MyAccount from "./MyAccount";
import LogIn from "./LogIn";
import Register from "./Register";
import Result from "./Result";
import ForgotPassword from "./ForgotPassword";


import "./App.css";
import { theme, useStyles } from "../Layout/useStyles";
import { MapProvider } from "../context/map-context";
import { UserProvider } from "../context/user-context";

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        disableGutters={true}
        className={classes.AppBody}
      >
        <MapProvider>
          <UserProvider>
           
            <Router>
              <Nav />
              <Switch>
                <Route exact path="/">
                  <Container
                    component="div"
                    maxWidth="lg"
                    className={classes.banner}
                  >
                    <Box className={classes.bannerImage}></Box>
                    <Typography variant="h2" className={classes.taglineHeading}>Awesome tagline</Typography>
                    <Typography variant="subtitle1" className={classes.taglineText}>
                      Some random text here maybe will be 2 lines of text
                    </Typography>
                  </Container>
                  <InputContainer />
                  <InfoContainer />
                  <AboutContainer />
                </Route>
                <Route exact path="/result">
                  <InputContainer />
                  <Result />
                </Route>
                <Route exact path="/login" component={LogIn} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/myAccount" component={MyAccount} />
                <Route exact path="/forgotPassword" component={ForgotPassword} />
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
