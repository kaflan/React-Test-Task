import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCoin, moduleName} from '../ducks/coins';
import ModalContext from './common/Modal';
import TableCoinInfo from "./common/Table";

class Coin extends Component {
    state = {
        visible: false,
        modalData: {
            "id": 3,
            "code": "ETH",
            "name": "Ethereum",
            "is_crypto": true
        },
    };

    componentDidMount() {
        this.props.getCoin();
    }
    onRowClick (record) {
        this.showModal();
        this.setState({
            modalData: record
        });
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        this.setState({
            visible: false,
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    render() {
        const {currency} = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col align-self-center" style={{
                        marginTop: '30%',
                    }}>
                        <div>Coin</div>
                        <TableCoinInfo data={currency} onRowClick={(record) =>this.onRowClick(record)}/>
                        <ModalContext
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <p>ID: {this.state.modalData.id}</p>
                            <p>code: {this.state.modalData.code}</p>
                            <p>name: {this.state.modalData.name}</p>
                            <p>is_crypto: {this.state.modalData.is_crypto? 'true': 'false'}</p>
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

