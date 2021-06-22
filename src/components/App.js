

import LogIn from './LogIn';
import Register from './Register';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login"><LogIn /></Route>
        <Route path = "/register"><Register /></Route>
       
      </Switch>
    </Router>
  )
}


export default App;