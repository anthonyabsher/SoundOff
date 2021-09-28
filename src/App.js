import './App.css';
import React, { Component } from 'react';
import Playroom from './components/playroom.component';
import Entry from './components/entry.component';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoadingPage from './components/loadingPage.component';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
            <div>
              <Route path="/entry"  component={Entry} exact />
              <Route path="/"  component={LoadingPage} exact />
              <Route path="/room"  component={Playroom} exact />
            </div>
        </Router>

    </div>
    )};
}

export default App;
