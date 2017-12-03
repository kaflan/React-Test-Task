import React, { Component } from 'react';
import {connect } from 'react-redux';

class Coin extends Component {

    render () {
        // const {handleSubmit} = this.props;
        return(
            <div className="container">
                <div className="row">
                    <div className="col align-self-center" style={{
                        marginTop: '30%',
                    }}>
                        <div>Coin</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null, null)(Coin);

