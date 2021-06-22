import "./App.css";
import Nav from "./Nav";
import InputContainer from "./InputContainer";
import InfoContainer from "./InfoContainer";
import Footer from "./Footer";
import LogIn from "./LogIn";
import Register from "./Register";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav />

      <Router>
        <Switch>
          <Route exact path="/">
            <InputContainer />
          </Route>

          <Route exact path="/">
            <InfoContainer />
          </Route>

          <Route exact path="/login">
            <LogIn />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
