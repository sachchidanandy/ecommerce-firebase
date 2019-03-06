import React , {Component} from 'react';
import Headers from '../common/Header';
import * as userAction from '../../actions/userAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import OrderDetail from './OrderDetails';
import {GST_PER} from '../../constants/AppConstants';
import { Redirect} from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import toastr from 'toastr';

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            isOpen : false
        };

        this.getSubTotal = this.getSubTotal.bind(this);
        this.getTax = this.getTax.bind(this);
        this.savePdf = this.savePdf.bind(this);
    }

    //Handle the toogle during mobile view
    onToggle() {
        this.setState((prevState) => ({
          isOpen: !prevState.isOpen
        }));
    }

    //Calculate sub total of all products in cart
    getSubTotal(lastOrder) {
        const priceArray = lastOrder.map(item => Number(item.product.price * item.quantity));
        return (priceArray.reduce((total, price) => total + price, 0)).toFixed(2);
    }

    //Calculate Tax
    getTax(subTotal) {
        return ((GST_PER * subTotal)/100).toFixed(2) ;
    }

    //Handle download or print of bill
    savePdf(event) {
        //Fetch name of button pressed
        const task = event.target.name;
        const billHtml = document.getElementById('billToSave');
        html2canvas(billHtml).then((billImage) => {
            const billImgData = billImage.toDataURL('image/png');
            const billPfd = new  jsPDF();
            billPfd.setFontSize(22);
            billPfd.text(20, 20, 'Thanks For Shopping With Us');
            billPfd.setFontSize(16);
            // addImage(imageData, format, x, y, width, height, alias, compression, rotation)
            billPfd.addImage(billImgData, 'JPEG',15, 30, 180, 0, 'Shopping Bill');
            task === 'download' ? billPfd.save("download.pdf") : billPfd.output('dataurlnewwindow',{});
            this.props.history.push('/dashboard');
        }).catch(error => toastr.error(error));
    }

    render() { 
        if (!this.props.user.hasOwnProperty('email')) {
            return <Redirect to = '/'/>;
        }
        const {user} = this.props;
        const subTotal = this.getSubTotal(user.lastOrder);
        const tax = this.getTax(subTotal);
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
                    <h4 style = {{color : '#a73a00', marginLeft: 'auto',marginRight: 'auto'}}> Thank you. Your Order has been received.</h4>
                    <OrderDetail lastOrder = {user.lastOrder} subTotal= {subTotal} tax ={tax} GST_PER = {GST_PER}/>
                    <button className = 'btn btn-primary' onClick = {this.savePdf} style = {{padding : '10px', margin : '10px'}} name = 'download'>Download PDF</button>
                    <button className = 'btn btn-primary' onClick = {this.savePdf} style = {{padding : '10px', margin : '10px'}} name = 'print'>Print PDF</button>
                </div>
            </div>
        );
    }
}
 
function addPropsToState (state) {
    return {
        user : state.user
    };
}

function addActionsToState (dispatch) {
    return {
        userAction : bindActionCreators(userAction, dispatch)
    };
}

export default connect(addPropsToState, addActionsToState)(Checkout);