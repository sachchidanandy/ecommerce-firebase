import React from 'react';
import BeforeLoginNav from './navbar/BeforeLogin';
import AfterLoginNav from './navbar/AfterLogin';

const Header  = ({ validUser, onFormChange, user, apiCallInProcess, login, toggle, isOpen })  => {
    return (
        localStorage.hasOwnProperty('user') ? <AfterLoginNav
        toggle = {toggle}
        isOpen = {isOpen}
        user  = {validUser}
        /> : <BeforeLoginNav
        user = {user}
        onFormChange = {onFormChange}
        login = {login}
        apiCallInProcess = {apiCallInProcess}/>
    );
};

export default Header;