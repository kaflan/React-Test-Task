import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from './redux';
import './App.css';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter} from 'react-router-redux';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
       <ConnectedRouter history={createHistory()}>
        
       </ConnectedRouter> 
      </Provider>
    );
  }
}

export default App;
