import React from 'react';
import InputField from '../common/InputField';
import { Form, Input } from 'reactstrap';

const LoginForm  = ({ user, onChange, onLogin, apiCallInProcess }) => {
    return(
        <Form>
            <InputField
                name = 'email'
                label = 'Email'
                InputType = 'email'
                placeholder = 'Enter Email Id'
                value  = {user.email}
                onChange = {onChange}
            />
            <InputField
                name = 'password'
                label = 'Password'
                InputType = 'password'
                placeholder = 'Enter Password'
                value  = {user.password}
                onChange = {onChange}
            />
            <Input
                type = 'submit'
                disabled = {apiCallInProcess}
                value = {apiCallInProcess ? 'Login...' : 'Login'}
                className = 'btn btn-primary'
                onClick = {onLogin}
            />
        </Form>
    );
};

export default LoginForm;