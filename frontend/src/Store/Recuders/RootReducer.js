import {  combineReducers } from 'redux';
import authReducer from './AuthReducer';
import userReducer from './UserReducer';
import cardReducer from './CardReducer';
const rootReducer = combineReducers({
        authReducer : authReducer,
        userReducer : userReducer,
        cardReducer : cardReducer   
})

export default rootReducer;
