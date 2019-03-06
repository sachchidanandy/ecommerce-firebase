import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const InputField = ({name, label, InputType, placeholder, value, onChange }) =>  {
    return (
        <FormGroup>
            <Label for = {name}>{label + ' :'}</Label>
            <Input
                type = {InputType}
                name = {name}
                placeholder = {placeholder}
                value = {value}
                onChange = {onChange}
            />
        </FormGroup>
    );
};

export default(InputField);