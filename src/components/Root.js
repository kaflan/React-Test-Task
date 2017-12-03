import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Auth from './autch';
import Coin from './coin';

export default class Root extends Component {
    render () {
        return(
            <div>
                <Switch>
                    <Route path="/" exact component={Auth}/>
                    <Route path="/coin" component={Coin}/>
                </Switch>
            </div>
        )
    }
}