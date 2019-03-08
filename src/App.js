import React, {Component} from 'react';
import AppRoutes from './Routes';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Redirect } from 'react-router-dom';
import { firebaseAuth } from './config/FirebaseConfig';
import './App.css';

const store = configureStore();

export default class App extends Component {

    componentDidMount() {
        firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user.uid));
                return <Redirect to = '/dashboard'/>;
            } else {
                localStorage.removeItem('user');
                return <Redirect to = '/'/>;
            }
        })
    }
    render () {
        return (
            <Provider store = {store}>
                <AppRoutes/>
            </Provider>
        );
    }
}