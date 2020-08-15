import * as actionType from '../Actions/ActionTypes';

const initialState = {
    cards : [],
     cardLoading : false 
}

const reducer = (state = initialState,action) => {
    switch(action.type) {
          case actionType.REMOVE_USER_CARD : const newDeck = [...state.cards];
                                                newDeck.pop();
                                                    return {
                                                                ...state,
                                                                cards : newDeck
                                                            }
            case actionType.START_LOADING_CARDS :  return {
                                                    ...state,
                                                    cardLoading : true
                                                } 
            case actionType.SUCCESS_LOADING_CARDS : return {
                                                    ...state,
                                                    cardLoading : false,
                                                    cards : action.data
                                                }                                                                                   
          default : return state;           
    }
}

export default reducer;