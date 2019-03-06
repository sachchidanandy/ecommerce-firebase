import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

const AfterLoginNav = ({toggle, isOpen, user }) => {
    function logOut () {
        localStorage.removeItem('user');
    }
    return (
        <Navbar light expand='md' style = {{backgroundColor : '#232f3e'}}>
            <NavbarBrand href='/' style={{color :'#00CED1'}}><h2>Your Cart</h2></NavbarBrand>
            <NavbarToggler onClick={toggle} className="mr-2"/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link to="">
                            <i  className= "fa fa-user-circle fa-lg" aria-hidden="true" style={{color :'#00CED1'}}>
                                <span style={{color :'#00CED1'}}>Hello, {user.firstName}</span>
                            </i>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/cart" style = {{padding : '20px'}} >
                            <i  className= "fa fa-shopping-bag fa-lg" aria-hidden="true" style={{color :'#00CED1'}}>
                                <span style={{color :'#00CED1'}}>{user.inCart.length ? user.inCart.length : ''}</span>
                            </i>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/" style = {{padding : '20px'}} >
                            <i  className= "fa fa-sign-out fa-lg" aria-hidden="true" style={{color :'#00CED1'}} onClick = {logOut}/>
                        </Link>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar> 
    );
};

export default AfterLoginNav;