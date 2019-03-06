import React from 'react';

const CheckBox = ({value, onChange, filterName}) => {
    return (
        <div className = 'checkbox'>
            <label><input type="checkbox" name = {filterName} value={value} onChange = {onChange}/> {value}</label>
        </div>
    );
}

export default CheckBox;