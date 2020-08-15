import * as actionType from '../Actions/ActionTypes';

const initialState = {
    id :'',
    name : '',
    profileUrl : '',
    gender : '',
    birthday : '',
    setting : {
        ageRange : {
            min : '',
            max : ''
        },
        distance : '',
        showOnly : '',
        pushNotification : ''
    },
    hobbies : [],
    musics : [],
    photos : [],
    academics : '',
    quotations : '',
    loading : false,
    updateLoader : false,
    error : null,
    matches : []
}

const reducer = (state = initialState,action) => {
    switch(action.type) {
        case actionType.LOAD_USER : return {
                        ...state,
                        id : action.user._id,
                        name : action.user.name,
                        profileUrl : action.user.profileUrl,
                        gender : action.user.gender,
                        birthday : action.user.dateOfBirth,
                        setting : action.user.setting,
                        quotations : action.user.quote,
                        academics : action.user.academics,
                        hobbies : action.user.hobbies,
                        musics : action.user.musics,
                        photos : [...action.user.photos],
                        matches : [...action.card.matches],
                        loading : false,
                        error : null
               }
        case actionType.START_LOADING : return {
                        ...state,
                        loading : true,
                        error : null
                }  
        case actionType.ERROR_LOADING : return {
                        ...state,
                        loading : false,
                        error : action.error
                }   
        case actionType.UPDATE_SUCCESS : return {
                        ...state,
                        setting : action.setting
               }             
        case actionType.PROFILE_UPDATE_SUCCESS : return {
                       ...state,
                       hobbies : action.userInfo.hobbies,
                       musics : action.userInfo.musics,
                       quotations : action.userInfo.quote,
                       academics : action.userInfo.academics,
                       name : action.userInfo.name,
                       birthday : new Date(action.userInfo.dateOfBirth),
                       updateLoader  : false,
                       error : null
                }    
        case actionType.PROFILE_UPDATE_START : return {
                        ...state,
                        updateLoader : true,
                        error : null
                }   
        case actionType.PROFILE_UPDATE_ERROR : return {
                        ...state,
                        updateLoader : false,
                        error : action.error
                }                
        case actionType.ADD_PHOTO : const newPhotos = [...state.photos];
                                    newPhotos.push(action.imagePath);  
                                return {
                                        ...state,
                                        photos : newPhotos
                                }        
        case actionType.REMOVE_PHOTO :  let newImages = [...state.photos];
                                        newImages.splice(action.index,1);
                                return {
                                        ...state,
                                        photos : newImages
                                }                         
        case actionType.CHANGE_PROFILE_PIC : return{
                                      ...state,
                                      profileUrl : action.link  
                                }                          
        default : return state;       
     }
}

export default reducer;