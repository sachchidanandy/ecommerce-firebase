import React from 'react';

const ProductSummary = ({deleteItems, sku, name, brand, flavour, packSize, offerIDs, price, thumbnailURL, quantity, onQuantityChange}) => {
    return (
        <div className = 'row' style = {{border : '2px solid black', borderRadius : '12px', marginBottom : '5px'}}>
            <div className = 'col-sm-3'>
                <img src = {thumbnailURL} alt = 'Wait...' style = {{maxWidth : '100%'}}/>
            </div>
            <div className = 'col-sm-4'>
                <ul style = {{fontStyle :'italic', marginTop : '10px', listStyleType : 'none'}}>
                    <li><h4 style = {{color : '#1870c7'}}>{name}</h4></li>
                    <li> by {brand}</li>
                    <li>{flavour}</li>
                    <li>{packSize}</li>
                    {offerIDs.length > 0 ? <li style = {{color : '#a73a00'}}>{offerIDs.length} offers</li> : ''}
                </ul>
            </div>
            <div className = 'col-sm-4'>
                <ul style = {{fontStyle :'italic', marginTop : '10px', listStyleType : 'none'}}>
                    <li style = {{color : '#a73a00'}}><h4>Rs. {price}</h4></li>
                    <li><h6>Quantity</h6></li>
                    <li>
                        <input type = 'number' value = {quantity} name = {sku} onChange = {onQuantityChange}/>
                    </li>
                    <li style = {{color : '#1870c7', alignSelf : 'flex-end', marginTop : '15px'}}>
                        <button type="button" className="btn btn-link" name = {sku} onClick = {deleteItems}>Delete</button> |  
                        <button type="button" className="btn btn-link">Save for later</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ProductSummary;