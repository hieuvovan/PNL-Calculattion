import React from 'react'
import PnlPage from './pages/pnl/index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import './assets/stylesheet/styles.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={PnlPage} />
      </Switch>
    </Router>
  );
}

export default App;
