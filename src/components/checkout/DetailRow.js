import React from 'react';

const DetailRow = ({product, quantity}) => {
    return(
        <tr>
            <td>{product.name}</td>
            <td> X {quantity}</td>
            <td>{(quantity * product.price).toFixed(2)}</td>
        </tr>
    );
}

export default DetailRow;