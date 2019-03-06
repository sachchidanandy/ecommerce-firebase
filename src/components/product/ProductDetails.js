import React from 'react';

const ProductDescription = ({name,brand, price, description, flavour, packSize, quantity, changeQuantity, changeQuantityButton, addToCart, ApiCallInProgress}) => {
    return (
        <React.Fragment>
            <h2>
                <span>{name}</span>
            </h2>
            <span>by <a href = '#'>{brand}</a></span>
            <table>
                <tbody>
                    <tr>
                        <td style = {{fontWeight : 'bold', fontSize : '1.15em'}}>Price : </td>
                        <td><h4>{price} Rs.</h4></td>
                    </tr>
                    <tr style = {{fontWeight : 'bold', fontSize : '1.15em'}}>
                        <td>Description : </td>
                        <td>{ description }</td>
                    </tr>
                    <tr style = {{fontWeight : 'bold', fontSize : '1.15em'}}>
                        <td>Flavour : </td>
                        <td>{ flavour }</td>
                    </tr>
                    <tr style = {{fontWeight : 'bold', fontSize : '1.15em'}}>
                        <td>Size : </td>
                        <td>{ packSize }</td>
                    </tr>
                    <tr>
                        <td>Quantity : </td>
                        <td>
                            <button className = 'btn btn-success' onClick = {changeQuantityButton} name = '+'>+</button>
                            <input type = 'number' min = {1} value = {quantity} style = {{margin : '5px'}} onChange = {changeQuantity}/>
                            <button className = 'btn btn-warning' onClick = {changeQuantityButton} name = '-'>-</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button 
                                style= {{ padding : '5px',margin : '10px', maxWidth : '100%'}}
                                className = 'btn btn-block btn-primary' 
                                onClick = {addToCart}
                                disabled  = {ApiCallInProgress}
                            >{ApiCallInProgress ? 'Adding...' : 'Add to Cart'}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </React.Fragment>
    );
}

export default ProductDescription;