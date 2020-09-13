import axios from 'axios';

export const loadCartDataIfAlreadyCreated = () => {
    return (dispatch) => {
        console.log(dispatch, 'recieveddddddddddddddddddddddddddd')
        axios({
            url:  `https://api.chec.io/v1/carts/${localStorage.getItem('cartID')}`,
            method: 'GET',
            headers: {
                "X-Authorization": "pk_18506b82013b046be195347e8aaa4de88f31e549b7943",
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }).then((response) => {
            let cartProductIds = response.data.line_items.map((item, index) => {
                return item.product_id
            })

            dispatch({
                type: 'SET_CART_DATA',
                data: {
                    cartData: response.data,
                    cartProductIds: cartProductIds,
                }
            })
        }).catch((err) => {
            console.log(err)
        })
    }
}

export const createCartForFirstTime = () => {
    return (dispatch) => {
        axios({
            url: "https://api.chec.io/v1/carts",
            method: 'GET',
            headers: {
                "X-Authorization": "pk_18506b82013b046be195347e8aaa4de88f31e549b7943",
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }).then((response) => {
            let cartID = response.data.id;

            localStorage.setItem('cartID', cartID)

            dispatch({
                type: 'CREATE_CART',
                data: {
                    cartData: response.data
                }
            })
        }).catch((err) => {
            console.log(err)
        })
    }
}


export const  addItemToCart = (productID) => {
    return (dispatch) => {
        let cartID = localStorage.getItem('cartID');

        axios({
            url: `https://api.chec.io/v1/carts/${cartID}`,
            method: "POST",
            headers: {
                "X-Authorization": "pk_18506b82013b046be195347e8aaa4de88f31e549b7943",
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            data: {
                "id": productID,
                "quantity": 1
            }
        }).then((response) => {

            let cartProductIds = response.data.cart.line_items.map((item, index) => {
                return item.product_id
            })

            dispatch({
                type: 'SET_CART_DATA',
                data: {
                    cartData: response.data.cart,
                    cartProductIds: cartProductIds
                }
            })
        }).catch((error) => {
            console.logI(error)
        })
    }
}


export const handleDelete = (itemID) => {
    return (dispatch) => {

        let cartID = localStorage.getItem('cartID');

        axios({
            url:  `https://api.chec.io/v1/carts/${cartID}/items/${itemID}`,
            method: 'DELETE',
            headers: {
                "X-Authorization": "pk_18506b82013b046be195347e8aaa4de88f31e549b7943",
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }).then((response) => {
            console.log(response)
            dispatch({
                type: 'CREATE_CART',
                data: {
                    cartData: response.data.cart
                }
            })
        }).catch((error) => {
            console.log(error)
        })
    }
}
