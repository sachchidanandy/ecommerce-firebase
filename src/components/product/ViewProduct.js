import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Headers  from '../common/Header';
import ProductDescription from './ProductDetails';
import ProductList from '../common/ProductList';
import { bindActionCreators } from 'redux';
import * as UserAction from '../../actions/userAction';
import toastr from 'toastr';

class ViewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isOpen : false,
            quantity : 1,
            ApiCallInProgress : false
        }
        this.changeQuantity = this.changeQuantity.bind(this);
        this.changeQuantityButton = this.changeQuantityButton.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.onToggle = this.onToggle.bind(this);
    }

    //Handle the toogle during mobile view
    onToggle() {
        this.setState((prevState) => ({
          isOpen: !prevState.isOpen
        }));
    }

    //Handle change by Input Field
    changeQuantity(event) {
        if (event.target.value > 0) {
            this.setState({quantity : event.target.value});
        }
    }

    //Handle change in quantity by button
    changeQuantityButton(event) {
        if (event.target.name === '+') {
            this.setState( prevState => ({quantity : prevState.quantity + 1}));
        } else {
            this.state.quantity > 1 && this.setState( prevState => ({quantity : prevState.quantity - 1}));
        }
    }

    //Add Products to cart
    addToCart() {
        this.setState ({ApiCallInProgress : true});

        this.props.UserAction.addToCart(this.props.user.email,
            {product : this.props.product, quantity : this.state.quantity}
        ).then ( () => {
            toastr.success('Product Added To Cart');
            this.setState({quantity : 1, ApiCallInProgress : false});
        }).catch ((error) => {
            toastr.error(error);
            this.setState({quantity : 1, ApiCallInProgress : false});
        });
    }

    render() { 
        if (!this.props.user.hasOwnProperty('email')) {
            return <Redirect to='/' />;
        }
        
        const {user, product, similarProducts} = this.props;
        const {isOpen, quantity, ApiCallInProgress} = this.state;
        return (
            <div className = 'container-fluid'>
                <div className = 'container-fluid sticky'>
                    <Headers
                        validUser = {user}
                        toggle ={this.onToggle}
                        isOpen = {isOpen}
                    />
                </div>
                <div className = 'container-fluid row relative'>
                    <div className = 'col-sm-11 col-md-5'>
                        <img src = {product.imageURLLarge} alt = 'Wait...' style = {{maxWidth : '100%'}}/>
                    </div>
                    <div className = 'col-sm-11 col-md-6'  style = {{borderRadius : '15px', border : '2px solid black', padding : '20px', backgroundColor : '#fcfcf7'}}>
                        <ProductDescription 
                            {...product}
                            quantity = {quantity} 
                            changeQuantity = {this.changeQuantity} 
                            changeQuantityButton = {this.changeQuantityButton}
                            addToCart = {this.addToCart}
                            ApiCallInProgress = {ApiCallInProgress}
                        />
                    </div>
                    <div className = 'col-sm-11' style = {{padding : '20px', margin : '20px'}}>
                        <span style = {{color : '#535456', fontWeight : 'bold', fontSize : '1.15em'}}>Similar Products :</span>
                        <ProductList products = {similarProducts} showMore = {true}/>
                    </div>
                </div>
            </div>
        );
    }
}

//Fetch the selected product
function getProductBySku (products, selectedProductSku) {
    const product = products.filter( product => product.sku === selectedProductSku);
    return product[0];
}

//Fetch  simila products using state
function getSimilarProduct (products, brand) {
    const similarProducts = products.filter( product => product.brand === brand);
    return (similarProducts.length ? similarProducts.slice(0, 4) : null); 
}

//pass state to props
function mapStateToProps(state, ownProps) {
    const selectedProductSku = ownProps.match.params.id;
    const products = state.products.Products;
    let product = {};
    let similarProducts = [];

    if (selectedProductSku && state.products.hasOwnProperty('Products')) {
        product = getProductBySku(products, selectedProductSku);
        similarProducts = getSimilarProduct(products, product.brand);
    }

    return {
        user: state.user,
        product : product,
        similarProducts : similarProducts
    };
}

function mapActionsToProps (dispatch) {
    return {
        UserAction : bindActionCreators(UserAction, dispatch)
    };
}

export default connect(mapStateToProps, mapActionsToProps)(ViewProduct);