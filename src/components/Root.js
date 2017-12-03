import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Auth from './autch';

export default class Root extends Component {
    render () {
        return(
            <div>
                 <Route path="/" exxact component={Auth}/>
                {/*<Route path="/auth" component={AuthPage}/>*/}
            </div>    
        )
    }
}