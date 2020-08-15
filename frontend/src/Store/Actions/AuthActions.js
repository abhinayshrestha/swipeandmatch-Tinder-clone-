import * as actionTypes from './ActionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    }
}

export const authSuccess = (token,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token : token,
        userId : userId
    }
}
export const authFail = (err) => {
    return{
        type : actionTypes.AUTH_FAIL,
        error : err
    }
}


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId');
    return {
        type : actionTypes.LOGOUT
    }
}

export const checkTokenTime = (expirationTime) => {
     return dispatch => {
         setTimeout(() => {
                dispatch(logout())
         },expirationTime * 1000)
     }   
}

export const onAuth = (data) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('/auth/facebook',data)
             .then( response => {
                 const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                 localStorage.setItem('token',response.data.token);
                 localStorage.setItem('userId',response.data.data.userId);
                 localStorage.setItem('expiresIn',expirationDate);
                 dispatch(authSuccess(response.data.token,response.data.data.userId));
                 dispatch(checkTokenTime(response.data.expiresIn));
             })       
             .catch( err => {
                 console.log(err);
                 dispatch(authFail());
             })
    }
}

export const autoSignIn = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
            if(!token){
                dispatch(logout());
            }
            else {
                const expiresIn = new Date(localStorage.getItem('expiresIn'));
                if(expiresIn < new Date()){
                    dispatch(logout());
                }
                else {
                    const userId = localStorage.getItem('userId');
                    dispatch(authSuccess(token,userId));
                    dispatch(checkTokenTime((expiresIn.getTime()- new Date().getTime())/1000));                                        
                }
            }
    }
}
