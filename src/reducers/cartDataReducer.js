
const defaultState = {
    messageCount: 10,
    message: 'Hello,  we have created redux setup'
}

export const cardDataReducer = (state = defaultState, action) => {

    switch (action.type) {
        case 'CHANGE_COUNT':
            return {
                ...state,
                messageCount: action.data
            }
        default:
            return state;
    }

}