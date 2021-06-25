import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import InputContainer from "./InputContainer";
import InfoContainer from "./InfoContainer";
import AboutContainer from "./AboutContainer";
import Footer from "./Footer";
import LogIn from "./LogIn";
import Register from "./Register";
import Result from "./Result";

import "./App.css";
import { MapProvider } from "../context/map-context";
import { UserProvider } from "../context/user-context"

function App() {
    return (
        <div className="App">
            <MapProvider>
              <UserProvider>
                <Nav />

                <Router>
                    <Switch>
                        <Route exact path="/">
                            <InputContainer />
                            <InfoContainer />
                            <AboutContainer />
                        </Route>
                        <Route exact path="/result" component={Result} />
                        <Route exact path="/login" component={LogIn} />
                        <Route exact path="/register" component={Register} />
                    </Switch>
                </Router>
                <Footer />
              </UserProvider>
            </MapProvider>
        </div>
    );
}

export default App;
