import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './components/home/Home';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import DashBoard from './components/dashBoard/DashBoard';
import ViewProduct from './components/product/ViewProduct';
import Cart from './components/cart/Cart';
import CheckOut from './components/checkout/CheckOut';

class AppRoute extends Component {
    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component = {Home}/>
                    <Route exact path='/dashboard' component={DashBoard}/>
                    <Route exact path='/viewProduct/:id' component={ViewProduct}/>
                    <Route exact path='/cart' component={Cart}/>
                    <Route exact path='/checkout' component={CheckOut}/>
                    <Route path='/about' component={About}/>
                    <Route path='/contact' component={Contact}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default AppRoute;