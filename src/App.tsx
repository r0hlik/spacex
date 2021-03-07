import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import './assets/sass/main.sass';
import LaunchDetail from './components/LaunchDetail';
import LaunchList from './components/LaunchList';
import logo from './assets/img/logo-spacex.svg';

function App() {
  return (
    <div className='app'>
      <Router>
        <header>
          <Link to='/'>
            <img src={logo} className='logo' alt='spacex logo' />
          </Link>
        </header>

        <section className='main'>
          <Switch>
            <Route path='/launch/:launchId'>
              <LaunchDetail />
            </Route>
            <Route path='/'>
              <LaunchList />
            </Route>
          </Switch>
        </section>
      </Router>
    </div>
  );
}

export default App;
