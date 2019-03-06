import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({products, showMore}) => {
    return (
        <div className = 'row'>
            {products.map(product => <ProductCard key = {product.sku} {...product}/>)}
            {showMore  ? <a style = {{alignSelf : 'flex-end'}} href = '#'>More...</a> : ''}
        </div>
    );
}
export default ProductList;