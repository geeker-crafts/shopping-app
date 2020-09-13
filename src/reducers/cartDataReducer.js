
const defaultState = {
    messageCount: 10,
    message: 'Hello,  we have created redux setup',
    cartData: {},
    cartProductIds: []
}

export const cardDataReducer = (state = defaultState, action) => {

    switch (action.type) {
        case 'CHANGE_COUNT':
            return {
                ...state,
                messageCount: action.data
            }
        case 'SET_CART_DATA':
            return {
                ...state,
                cartData: action.data.cartData,
                cartProductIds: action.data.cartProductIds
            }
        case 'CREATE_CART':
            return {
                ...state,
                cartData: action.data.cartData
            }
        default:
            return state;
    }

}