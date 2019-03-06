import delay from './delay';
import * as products from './ProductData';

class productApi {
  static getAllproducts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign({}, products.ProductData));
      }, delay);
    });
  }
}

export default productApi;