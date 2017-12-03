import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from './redux';
import './App.css';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter} from 'react-router-redux';
import Root from './components/Root';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
       <ConnectedRouter history={createHistory()}>
        <Root/>
       </ConnectedRouter> 
      </Provider>
    );
  }
}

export default App;
