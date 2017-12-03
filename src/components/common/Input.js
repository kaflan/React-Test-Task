import React from 'react';
import { Icon, Input } from 'antd';

const InputField = ({input, meta, meta: {error, touched, submitFailed}, label, disabled, textArea, ...props}) => (
    <Input
        className="marginTop"
        prefix={<Icon type="user" style={{ fontSize: 13 }} />}
        {...props}
        {...input}
        placeholder={props.placeholder}
/>);

export default InputField;