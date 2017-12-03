import React, { Component } from 'react';
import {connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, Button} from 'antd';
import InputField from  './common/Input';
import {signInSaga} from '../ducks/auth';

class Auth extends Component {
    submit({username, password}) {
        console.log(username, password);
    };
    render () {
        const {handleSubmit} = this.props;
        // console.log(this.props.signInSaga);

        return(
            <div className="container">
                <div className="row">
                    <div className="col align-self-center" style={{
                        marginTop: '30%',
                    }}>
                        <Form onSubmit={handleSubmit((values)=> this.submit(values))} className="login-form">
                            <Field
                                name="username"
                                component={InputField}
                                type="text"
                                placeholder="username"
                                className="marginTop"
                            />
                            <Field
                                name="password"
                                component={InputField}
                                type="password"
                                placeholder="password"
                            />
                            <Button type="primary" htmlType="submit" className="login-form-button col marginTop">
                                Log in
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
Auth = connect(null, {signInSaga})(Auth);
export default reduxForm({
    form: 'auth'
})(Auth);
