import React from 'react';

const TotalCost = ({totalItems, subTotal, GST_PER, tax, buyNow}) => {
    return (
        <div style = {{backgroundColor : '#f3f3f3', padding : '20px', borderRadius : '15px'}}>
            <table>
                
                <tbody style = {{color : '#a73a00'}}>
                    <tr>
                        <td><h6>{totalItems > 1 ?'Items' : 'Item'}</h6></td>
                        <td><h6> : </h6></td>
                        <td><h6>{totalItems}</h6></td>
                    </tr>
                    <tr>
                        <td><h6>Subtotal</h6></td>
                        <td><h6> : </h6></td>
                        <td><h6>{subTotal}</h6></td>
                    </tr>
                    <tr>
                        <td><h6>GST (+{GST_PER}%)</h6></td>
                        <td><h6> : </h6></td>
                        <td><h6>{tax}</h6></td>
                    </tr>

                    <tr style = {{borderTop : '1px solid',marginTop : '5px'}}>
                        <td><h5>Total</h5></td>
                        <td><h5> : </h5></td>
                        <td><h5>Rs {(subTotal + tax).toFixed(2)}</h5></td>
                    </tr>
                </tbody>
            </table>                                     
            <button style = {{backgroundColor : '#f0c859'}} onClick = {buyNow}>Buy Now</button>
        </div>
    );
}

export default TotalCost;