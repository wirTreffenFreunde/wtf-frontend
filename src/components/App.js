import "./App.css";
import Nav from "./Nav";
import InputContainer from "./InputContainer";
import InfoContainer from "./InfoContainer";
import Footer from "./Footer";
import MyAccount from "./MyAccount";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav />
      <InputContainer />
      <InfoContainer />
      <Footer />
      <MyAccount />

      <Router>
        <Switch>
          <Route path="/myAccount">
            <MyAccount />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
