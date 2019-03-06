 
class userApi {
    static fetchUser(email) {
        return fetch(`http://localhost:3001/users?email=${email}`)
        .then( response => response.json()).then (user => {
            if (user.length) {
                delete user[0].password;
                delete user[0].ordered;
                return user[0];
            } else {
                throw 'Invalid User Details';
            }
        }).catch ((error) => {
            throw error;
        });
    }
    static login(user) {
        return fetch(`http://localhost:3001/users?email=${user.email}&password=${user.password}`)
        .then( response => response.json()).then (user => {
            if (user.length) {
                delete user[0].password;
                delete user[0].ordered;
                return user[0];
            } else {
                throw 'Invalid User Details';
            }
        }).catch ((error) => {
            throw error;
        });
    }

    static saveUser(user) {
        user = Object.assign({}, user); // to avoid manipulating object passed in.
        
        return fetch(`http://localhost:3001/users?email=${user.email}`)
        .then( response => response.json())
        .then (fetchedUsers => {
            if (fetchedUsers.length) {
                throw('Email Id Already Registered');
            } else {
            user.inCart = [];
            user.ordered = [];
            user.lastOrder = [];
            return user
            }
        }).then(user => {
            return fetch('http://localhost:3001/users',{
            method : 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(user)});
        }).then( response => response.json())
        .then(user => user).catch(err => {throw err});
    }

    static addToCart(userId, product) {
        return fetch(`http://localhost:3001/users?email=${userId}`)
        .then( response => response.json())
        .then (user => {
            if (!user.length) {
                throw('User Does Not Exist');
            }
            user = user[0];
            const productIndex = user.inCart.findIndex(item => item.product.sku === product.product.sku);
            if (productIndex >= 0) {
                user.inCart[productIndex].quantity = product.quantity;
            } else {
                user.inCart.push(product);
            }
            return user;
        }).then(user => {
            return fetch(`http://localhost:3001/users/${user.id}`,{
            method : 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(user)});
        }).then(response => response.json())
        .then(user => {
            return  user.inCart;
        }).catch(err => {throw err});
    }

    static deleteFromCart(email, productSku) {
        return fetch(`http://localhost:3001/users?email=${email}`)
        .then( response => response.json())
        .then (user => {
            if (!user.length) {
                throw 'User Does Not Exist';
            }
            user = user[0];
            const newCart = user.inCart.filter(item => item.product.sku !== productSku);
            user.inCart = newCart;
            return user;
        }).then(user => {
            return fetch(`http://localhost:3001/users/${user.id}`,{
            method : 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(user)});
        }).then(response => response.json())
        .then(user => user.inCart).catch(err => {throw err});
    }

    static buyProducts(email, inCartProducts) {
        return fetch(`http://localhost:3001/users?email=${email}`)
        .then ( response => response.json())
        .then ( user => {
            if (!user.length) {
                throw 'User Does Not Exist';
            }
            user = user[0];
            user.inCart = [];
            user.ordered = [...user.ordered, ...inCartProducts];
            user.lastOrder = [...inCartProducts];
            return user;
        }).then (user => {
            return fetch (`http://localhost:3001/users/${user.id}`, {
            method : 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(user)});
        }).then(response => response.json())
        .then(user => user.lastOrder).catch(err => {throw err});
    }
}

export default userApi;