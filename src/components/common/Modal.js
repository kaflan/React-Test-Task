import React from 'react';
import {Modal, Button} from 'antd';

export default class ModalContext extends React.Component {
    render() {
        return (
            <Modal
                title="Basic Modal"
                visible={this.props.visible}
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
                footer={[
                    <Button key="back" size="large" onClick={this.props.onCancel}>Return</Button>,
                    <Button key="submit" type="primary" size="large" onClick={this.props.onOk}>
                        Submit
                    </Button>,
                ]}
            >
                {this.props.children}
            </Modal>
        );
    }
}
