import { createStore } from "redux";
import { cardDataReducer } from '../reducers/cartDataReducer';

const store = createStore(cardDataReducer);

export default store;