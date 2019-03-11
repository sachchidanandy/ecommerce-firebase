import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Button 
} from 'reactstrap';
import InputField from '../InputField';

const BeforeLoginNav = ({ onFormChange, user, apiCallInProcess, login}) => {
    return (
        <Navbar expand='md' style = {{backgroundColor : '#D5D8DC'}}>
            <NavbarBrand href='/' style={{color :'#00CED1'}}><h2>Your Cart</h2></NavbarBrand>
            <Collapse navbar>
                <Nav className='ml-auto' navbar>
                    <NavItem style ={{margin : 5}}>
                        <InputField
                            name = 'email'
                            label = 'Email'
                            InputType = 'email'
                            placeholder = 'Enter Email'
                            value = {user.email}
                            onChange = {onFormChange}
                        />
                    </NavItem>
                    <NavItem style ={{margin : 5}}>
                        <InputField
                            name = 'password'
                            label = 'Password'
                            InputType = 'password'
                            placeholder = 'Enter Password'
                            value = {user.password}
                            onChange = {onFormChange}
                        />
                    </NavItem>
                    <NavItem style ={{margin : 12}}>
                        <br/>
                        <Button className = 'btn btn-primary' onClick = {login} disabled = {apiCallInProcess}>
                        {apiCallInProcess ? 'Login...' : 'Login'}
                        </Button>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar> 
    );
};

export default BeforeLoginNav;