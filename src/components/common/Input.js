import React from 'react';
import { Icon, Input } from 'antd';

const InputField = ({input, meta, meta: {error}, ...props}) => {
    return(
        <div>
            <Input
                className="marginTop"
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                {...props}
                {...input}
                placeholder={props.placeholder}
            />
            {error ? <span>{error}</span>: null}
    </div>
    );
};

export default InputField;