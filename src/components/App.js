import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import InputContainer from "./InputContainer";
import InfoContainer from "./InfoContainer";
import Footer from "./Footer";
import LogIn from "./LogIn";
import Register from "./Register";
import Result from "./Result";

import "./App.css";
import { AppData } from "../app-data-context";
import { accessToken } from "mapbox-gl";

function App() {

  // input fields for everyone
  const [peopleAddresses, setPeopleAddresses] = useState([]);
  // middle point
  const [middlePoint, setMiddlePoint] = useState("");

  // saving all the input fields
  const handleChangeMiddle = (e) => {
    setPeopleAddresses({
      ...peopleAddresses,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitMiddle = async (e) => {
    e.preventDefault();
    console.log(peopleAddresses);
    const result = await axios.post(
      `http://localhost:8080/api`,
      Object.values(peopleAddresses)
    );
    console.log(result.data);
    setMiddlePoint(result.data);
  };

  return (
    <div className="App">
      <AppData.Provider
        value={{
          peopleAddresses,
          setPeopleAddresses,
          middlePoint,
          setMiddlePoint,
          handleChangeMiddle,
          handleSubmitMiddle,
        }}
      >
        <Nav />

        <Router>
          <Switch>
            <Route exact path="/">
              <InputContainer />
            </Route>

            <Route exact path="/">
              <InfoContainer />
            </Route>

            <Route exact path="/result">
              <Result />
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
      </AppData.Provider>
    </div>
  );
}

export default App;
