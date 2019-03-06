import React, {Component} from 'react';
import AppRoutes from './Routes';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './App.css';
import {fetchUser} from './actions/userAction';
import {Redirect} from 'react-router-dom';

const store = configureStore();

export default class App extends Component {
    render () {
        return (
            <Provider store = {store}>
                <AppRoutes/>
            </Provider>
        );
    }
}