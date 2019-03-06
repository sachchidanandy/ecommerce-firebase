import React from 'react'; 
import {Link} from 'react-router-dom';

const ProductCard = ({sku, name, thumbnailURL, price, offerIDs}) => {
    return (
        <div className = "card" style={{width: '250px', margin : '8px', height : '275px'}}>
            <Link to = {`/viewProduct/${sku}`}>
                <img  className= "card-img-top" src={thumbnailURL} alt="Card Pic cap" style={{height: '120px', padding : '8px'}}/>
            </Link>
            <div className="card-body">
                <h6  className= "card-subtitle mb-2 text-muted">{name}</h6>
                <h5  className= "card-title">Rs. {price}</h5>
                <span  className= "card-text" style={{color: 'red '}}>{'OFFERS : ' + offerIDs.length}</span>
            </div>
        </div>
    );
}

export default ProductCard;