import React, { Component } from 'react';
import Header from '../common/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAction from '../../actions/userAction';
import * as productAction from '../../actions/productsAction';
import LoginForm from './LoginForm';
import RegistrationForm from './Registration';
import { Input } from 'reactstrap';
import  { Redirect } from 'react-router-dom';
import toastr from 'toastr';
import { firebaseAuth, firestore } from '../../config/FirebaseConfig';

class Home extends Component {
    constructor (props) {
        super(props);
        this.state ={
            user : {
                email : '',
                password : ''
            },
            registerUser : {
                email : '',
                password : '',
                firstName : '',
                middleName : '',
                lastName : ''
            },
            loginInProcess : false,
            registrationInProcess : false,
            showLogin :true
        };
        this.onLoginChangeForm = this.onLoginChangeForm.bind(this);
        this.onRegisterChangeForm = this.onRegisterChangeForm.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.toogle = this.toogle.bind(this);
    }

    //Handle's change in the login form
    onLoginChangeForm(event) {
        const user = Object.assign({}, this.state.user);
        user[event.target.name] = event.target.value;
        this.setState({user : user});
    }

    //Handle's change in the register form
    onRegisterChangeForm(event) {
        const registerUser = Object.assign({}, this.state.registerUser);
        registerUser[event.target.name] = event.target.value;
        this.setState({registerUser : registerUser});
    }

    //Handle Login
    onLogin(event) {
        event.preventDefault();
        this.setState({loginInProcess : true});
        const user = Object.assign({}, this.state.user);
        firebaseAuth.signInWithEmailAndPassword(user.email, user.password)
        .then(() => this.props.history.push('/dashboard'))
        .catch(error => {
            toastr.error(error);
            this.setState({
                loginInProcess : false,
                user : {
                    email : '',
                    password : ''
                }
            });
        });
    }

    //Handle's User Registration
    onRegister(event) {
        event.preventDefault();
        this.setState({registrationInProcess : true});
        const user = Object.assign({}, this.state.registerUser);
        firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
        .then( cred => {
            return firestore.collection('users').doc(cred.user.uid).set({
                email : user.email,
                firstName : user.firstName,
                middleName : user.middleName,
                lastName : user.lastName
            });
        }).then (() => this.props.history.push('/dashboard'))
        .catch(error => {
            toastr.error(error);
            this.setState({
                registrationInProcess : false,
                registerUser : {
                    email : '',
                    password : '',
                    firstName : '',
                    middleName : '',
                    lastName : ''
                }
            });
        });
    }

    //Handles toogle
    toogle() {
        this.setState({showLogin : !this.state.showLogin});
    }

    render() {
        if (localStorage.hasOwnProperty('user')) {
            return <Redirect to = '/dashboard'/>;
        }
        const {user, registrationInProcess, showLogin, registerUser, loginInProcess } = this.state;
        return (
            <div className = 'container-fluid'>
                <div className = 'container-fluid sticky'>
                    <Header
                        validUser = {this.props.user}
                        user = {user}
                        onFormChange = {this.onLoginChangeForm}
                        apiCallInProcess = {loginInProcess}
                        login = {this.onLogin}
                    />
                </div>
                <div className = 'container-fluid row relative'>
                    <div className = 'col-lg-7 System align-self-center'>
                        <img src = 'assets/images/homePic.jpg' alt = 'Shoping'/>
                    </div>
                    <div className = 'col-lg-4 Tablet align-self-center FormDiv'>
                        <div style ={{padding : 10}}>
                            <h3 style ={{padding : 10}}>Don't Have Account..?</h3>
                            <h4 style ={{padding : 10}}>Create It Now !..</h4>
                            <RegistrationForm
                                user = {registerUser} 
                                onChange = {this.onRegisterChangeForm} 
                                onRegister = {this.onRegister} 
                                apiCallInProcess = {registrationInProcess}
                            />
                        </div>
                    </div>
                    <div className = 'col-sm-11 Mobile align-self-center'>
                        {
                            showLogin ? <LoginForm 
                            user = {user} 
                            onChange = {this.onLoginChangeForm} 
                            onLogin = {this.onLogin} 
                            apiCallInProcess = {loginInProcess}
                            /> :  <RegistrationForm
                            user = {registerUser} 
                            onChange = {this.onRegisterChangeForm} 
                            onRegister = {this.onRegister} 
                            apiCallInProcess = {registrationInProcess}
                            />
                        }
                        <br/>
                        <Input
                            type = 'submit'
                            value = {showLogin ? 'Create Account' : 'Sign In'}
                            className = 'btn btn-success'
                            onClick = {this.toogle}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        products : state.products
    };
}

function mapActionsToProps (dispatch) {
    return {
        userActions : bindActionCreators(userAction, dispatch),
        productActions : bindActionCreators(productAction, dispatch)
    };
}

export default connect(mapStateToProps,mapActionsToProps)(Home);