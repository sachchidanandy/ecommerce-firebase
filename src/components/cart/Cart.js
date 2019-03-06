import React, {Component} from 'react';
import Headers from '../common/Header';
import ProductSummary from '../common/ProductSummary';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userAction from '../../actions/userAction';
import toastr from 'toastr';
import {GST_PER} from '../../constants/AppConstants';
import TotalCost from './TotalCost';

class Cart extends Component {
    constructor (props) {
        super(props);
        this.state = { 
            isOpen : false,
            ApiCallInProgress : false,
            cartItems : this.props.user.inCart
        };

        this.onQuantityChange = this.onQuantityChange.bind(this);
        this.getSubTotal = this.getSubTotal.bind(this);
        this.deleteItems = this.deleteItems.bind(this);
        this.getTotalItems = this.getTotalItems.bind(this);
        this.getTax = this.getTax.bind(this);
        this.buyProducts = this.buyProducts.bind(this);
    }

    //Handle the toogle during mobile view
    onToggle() {
        this.setState((prevState) => ({
          isOpen: !prevState.isOpen
        }));
    }
    
    //Life Cycle methos invoked immediately after updating occurs
    componentDidUpdate(prevProps) {
        if (this.props.user.inCart.length !== prevProps.user.inCart.length) {
            this.setState({cartItems : this.props.user.inCart});
        }
    }

    //Handle change in the quantity of product in cart
    onQuantityChange(event) {
        if (event.target.value > 0) {
            const cartItems = [...this.state.cartItems];
            const cartIndex = cartItems.findIndex((item) => item.product.sku === event.target.name);
            cartItems[cartIndex].quantity = event.target.value;
            this.setState({cartItems : cartItems});
        }
    }

    //Delete productts from cart
    deleteItems(event) {
        this.props.userAction.deleteFromCart(this.props.user.email, event.target.name)
        .then (() => toastr.success('Product deleted from Cart'))
        .catch((error) => toastr.error(error));
    }

    //Calculate sub total of all products in cart
    getSubTotal(cartItems) {
        const priceArray = cartItems.map(item => Number(item.product.price * item.quantity));
        return (priceArray.reduce((total, price) => total + price, 0)).toFixed(2);
    }

    //Calculate total items
    getTotalItems(cartItems) {
        const quantityArray = cartItems.map(item => Number(item.quantity));
        return quantityArray.reduce((total, price) => total + price, 0);
    }

    //Calculate Tax
    getTax(subTotal) {
        return ((GST_PER * subTotal)/100).toFixed(2) ;
    }

    //Buy Now 
    buyProducts(event){
        this.props.userAction.buyProducts(this.props.user.email, this.state.cartItems)
        .then (() => this.props.history.push('/checkout')).catch (error => toastr.error(error));
    }

    render() {
        if (!this.props.user.hasOwnProperty('email')) {
            return <Redirect to = '/'/>;
        }

        const {user} = this.props;
        const {cartItems} = this.state;
        const subTotal = Number(this.getSubTotal(cartItems));
        const totalItems = Number(this.getTotalItems(cartItems));
        const tax = Number(this.getTax(subTotal));
        return (
            <div className = 'container-fluid'>
                <div className = 'container-fluid sticky'>
                    <Headers
                        validUser = {user}
                        toggle ={this.onToggle}
                        isOpen = {this.state.isOpen}
                    />
                </div>
                <div className = 'container-fluid relative'>
                    <h3 style = {{color : '#a73a00'}}>Shopping Cart</h3>
                    {cartItems.length <= 0 ? <Link to = '/dashboard'><h4>Shop Now!!</h4></Link> 
                    :<div className = 'row'> 
                        <div className = 'scroll-container col-9'>
                            { cartItems.map(
                                item => <ProductSummary key = {item.product.sku} onQuantityChange = {this.onQuantityChange} {...item.product} deleteItems = {this.deleteItems}quantity = {item.quantity}/>
                            )}
                        </div>
                        <div className = 'col-3'>
                            <TotalCost totalItems = {totalItems} subTotal = {subTotal} GST_PER = {GST_PER} tax = {tax} buyNow = {this.buyProducts}/>
                        </div>
                    </div>
                    }
                </div>
            </div>
        );
    }
}
 
function addStateToProps (state) {
    return {
        user : state.user
    };
}

function addActionsToProps (dispatch) {
    return {
        userAction : bindActionCreators(userAction, dispatch)
    };
}

export default connect(addStateToProps, addActionsToProps)(Cart);