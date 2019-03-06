import React from 'react';
import DetailRow from './DetailRow';
import { Table } from 'reactstrap';

const OrderDetail = ({lastOrder, subTotal, tax, GST_PER}) => {
    return(
        <div id = 'billToSave' style = {{ width: '210mm',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding : '20px'}}>
            <Table responsive hover striped>
                <thead style = {{backgroundColor : '#f6fcff'}}>
                    <tr>
                        <th><h5>Product</h5></th>
                        <th><h5>Quantity</h5></th>
                        <th><h5>Cost</h5></th>
                    </tr>
                </thead>
                <tbody>                    
                    {lastOrder.map((product, key) => <DetailRow key = {key} {...product}/>)}
                </tbody>
                <tfoot>
                    <tr style = {{color : '#a73a00'}}>
                        <td>Subtotal</td>
                        <td>:</td>
                        <td>{subTotal}</td>
                    </tr>
                    <tr style = {{color : '#a73a00'}}>
                        <td>GST</td>
                        <td>+{GST_PER}%</td>
                        <td>{tax}</td>
                    </tr>
                    <tr style = {{backgroundColor : '#f6fcff', color : '#a73a00'}}>
                        <td><h4>Total</h4></td>
                        <td><h4>:</h4></td>
                        <td><h4>{(+subTotal) + (+tax)}</h4></td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    );
}

export default OrderDetail;