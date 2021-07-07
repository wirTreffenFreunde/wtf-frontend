import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Container } from "@material-ui/core";
import Nav from "./Nav";
import InputContainer from "./InputContainer";
import InfoContainer from "./InfoContainer";
import AboutContainer from "./AboutContainer";
import Footer from "./Footer";
import MyAccount from "./MyAccount";
import LogIn from "./LogIn";
import Register from "./Register";
import Result from "./Result";

import "./App.css";
import { theme } from "../Layout/useStyles";
import { MapProvider } from "../context/map-context";
import { UserProvider } from "../context/user-context";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <MapProvider>
          <UserProvider>
            <Nav />
            <Router>
              <Switch>
                <Route exact path="/">
                  <Container maxWidth={1}>
                    <InputContainer />
                    <InfoContainer />
                    <AboutContainer />
                  </Container>
                </Route>
                <Route exact path="/result">
                  <InputContainer />
                  <Result />
                </Route>
                <Route exact path="/login" component={LogIn} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/myAccount" component={MyAccount} />
              </Switch>
            </Router>
            <Footer />
          </UserProvider>
        </MapProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
