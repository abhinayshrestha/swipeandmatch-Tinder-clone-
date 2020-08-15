import * as actionType from '../Actions/ActionTypes';

const initialState = {
    showSignupOTPForm : false,
    token : null,
    userId : null,
    loading : false
}

const reducer = (state = initialState,action) =>{
    switch(action.type){
        case actionType.AUTH_START : return {
             ...state,
             loading : true
        }
        case actionType.SHOW_SIGNUP_OTP_FORM : return {
                     ...state,
                     showSignupOTPForm : true      
                }       
        case actionType.HIDE_SIGNUP_OTP_FORM : return {
            ...state,
            showSignupOTPForm : false
        }         
        case actionType.AUTH_SUCCESS : return {
            ...state,
            token : action.token,
            userId : action.userId,
            loading : false
        }
        case actionType.LOGOUT : return {
            ...state,
            token : null,
            userId : null,
            loading : false
        }
        default : return state;         
    } 
}

export default reducer;