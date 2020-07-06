import * as actionTypes from './ActionTypes';
import axios from 'axios';

export const startLoading = () => {
    return {
        type : actionTypes.START_LOADING
    }
}

export const loadUser = (user,card) => {
    return {
        type : actionTypes.LOAD_USER,
        user : user,
        card : card
    }
}

export const loadError = (err) => {
    return {
        type : actionTypes.ERROR_LOADING,
        error : err
    }
}

export const getUserData = (token) => {
     return dispatch => {
         dispatch(startLoading());
         axios.get('http://localhost:8080/app',
          { headers : {Authorization : `Bearer ${token}`} }
          )
           .then(response => {
               dispatch(loadUser(response.data.userDoc,response.data.card));
           })
           .catch(err => {
               dispatch(loadError(err))
           })
     }
}

const updateSuccess = setting => {
    return { 
        type : actionTypes.UPDATE_SUCCESS,
        setting : setting
    }
}

const updateError = err => {
    return {
        type : actionTypes.UPDATE_ERROR,
        error : err
    }
}

export const updateSetting = (token,setting) => {
    return dispatch => {
        axios.put('http://localhost:8080/app/setting',
                   setting,
                   { headers : { Authorization : `Bearer ${token}` } }
                )
                .then(response => {
                    dispatch(updateSuccess(response.data.post.setting));
                })
                .catch(err => {
                    console.log(err);
                    dispatch(updateError(err));
                })
    }
}

const startProfileUpdate = () => {
    return {
        type : actionTypes.PROFILE_UPDATE_START
    }
}

const profileUpdateSuccess = (userInfo) => {
    return {
        type : actionTypes.PROFILE_UPDATE_SUCCESS,
        userInfo : userInfo
    }
}

const profileUpdateError = err => {
    return {
        type : actionTypes.PROFILE_UPDATE_ERROR,
        error :err
    }
}

export const updateProfile = (token,userInfo) => {
    return dispatch => {
        dispatch(startProfileUpdate());
        axios.put('http://localhost:8080/app/profile',
                    userInfo,
                    { headers : { Authorization : `Bearer ${token}` } } 
                 )
              .then(response => {
                dispatch(profileUpdateSuccess(response.data));
              })
              .catch(err => {
                  dispatch(profileUpdateError(err))
              })   
    }
}

export const addPhoto = url => {
    return {
        type : actionTypes.ADD_PHOTO,
        imagePath : url
    }
}

export const removePhoto = i => {
    return{
        type : actionTypes.REMOVE_PHOTO,
        index : i
    }
}

export const updateProfilePic = link => {
    return {
        type : actionTypes.CHANGE_PROFILE_PIC,
        link : link
    }
}