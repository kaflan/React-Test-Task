import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCoin, moduleName} from '../ducks/coins';
import ModalContext from './common/Modal';
import TableCoinInfo from "./common/Table";

class Coin extends Component {
    state = {
        visible: false,
        modalData: null
    };

    componentDidMount() {

    }
    onRowClick (record, index, event) {
        console.log(record, index, event);
        this.showModal();
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    render() {
        const data = [{
            "id": 3,
            "code": "ETH",
            "name": "Ethereum",
            "is_crypto": true
        }, {
            "id": 2,
            "code": "BTC",
            "name": "Bitcoin",
            "is_crypto": true
        }, {
            "id": 4,
            "code": "USD",
            "name": "US Dollar",
            "is_crypto": false
        }, {
            "id": 1,
            "code": "EUR",
            "name": "EURO",
            "is_crypto": false
        }];
        const {currency} = this.props;
        console.log(currency);
        return (
            <div className="container">
                <div className="row">
                    <div className="col align-self-center" style={{
                        marginTop: '30%',
                    }}>
                        <div>Coin</div>
                        <TableCoinInfo data={data} onRowClick={(record) =>this.onRowClick(record)}/>
                        <ModalContext
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >

                        </ModalContext>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    currency: state[moduleName].currency
}), {
    getCoin
})(Coin);

