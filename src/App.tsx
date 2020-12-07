import { ReactQueryDevtools } from 'react-query-devtools';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/inbox' />} />
          <Route path='/inbox' exact component={Home} />
        </Switch>
      </Router>

      <ReactQueryDevtools initialIsOpen />
    </>
  );
}

export default App;
