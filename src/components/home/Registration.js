import React from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import InputField from '../common/InputField';

const Registration = ({user, onChange, onRegister, apiCallInProcess}) =>{
    return (
        <Form>
            <InputField
                name = 'firstName'
                label = 'First Name'
                InputType = 'text'
                placeholder = 'First Name'
                value  = {user.firstName}
                onChange = {onChange}
            />
            <InputField
                name = 'middleName'
                label = 'Middle Name'
                InputType = 'text'
                placeholder = 'Middle Name'
                value  = {user.middleName}
                onChange = {onChange}
            />
            <InputField
                name = 'lastName'
                label = 'Last Name'
                InputType = 'text'
                placeholder = 'Last Name'
                value  = {user.lastName}
                onChange = {onChange}
            />
            <InputField
                name = 'email'
                label = 'Email'
                InputType = 'email'
                placeholder = 'Email'
                value  = {user.email}
                onChange = {onChange}
            />
            <InputField
                name = 'password'
                label = 'Password'
                InputType = 'password'
                placeholder = 'Password'
                value  = {user.password}
                onChange = {onChange}
            />
            <FormGroup>
                <Input
                    type = 'submit'
                    disabled = {apiCallInProcess}
                    value = {apiCallInProcess ? 'Registering...' : 'Register'}
                    className = 'btn btn-primary'
                    onClick = {onRegister}
                />
            </FormGroup>
        </Form>
    );
};

export default Registration;