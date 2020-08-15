import * as actions from './ActionTypes';
import axios from 'axios';

export const swipeCardHandler = () => {
    return {
        type : actions.REMOVE_USER_CARD
    }
}

export const removeCard  = (direction,id,liked) => {
      return (dispatch,getState) => {          
        const swipeInfo = {
            direction : direction,
            id : id,
            userId : getState().userReducer.id,
            liked : liked
        }
        axios.post('/cards/swipe',
                    swipeInfo,
                { headers : { Authorization : `Bearer ${localStorage.getItem('token')}` } })
                .then(response => {
                    dispatch(swipeCardHandler());
                })
                .catch(err => {
                    console.log(err);
                })
      }      
}

export const startCardLoading = () => {
    return {
        type : actions.START_LOADING_CARDS
    }
}

export const loadingSuccess = data => {
    return {
        type : actions.SUCCESS_LOADING_CARDS,
        data : data
    }
}

export const loadingFail = err => {
    return {
        type : actions.FAILED_LOADING_CARDS,
        err : err
    }
}

export const loadCards = (token,lat,lng) => {
    return (dispatch, getState) => {
      if(getState().userReducer.id){
        const cardInfo = {
             lat : lat,
             lng : lng,
             userId : getState().userReducer.id,
             showOnly : getState().userReducer.setting.showOnly,
             maxDistance : getState().userReducer.setting.distance
        }
        dispatch(startCardLoading());
        axios.post('/cards',
                        cardInfo,
                        { headers : { Authorization : `Bearer ${token}` } }
                  )
                  .then(res => {
                      console.log(res);
                      const cardUsers = []
                      res.data.message.map(card => {
                          return cardUsers.push({
                              name : card.userId.name,
                              url : card.userId.profileUrl,
                              age : card.age,
                              distance : card.distance,
                              id : card.shown[0],
                              liked : card.liked
                          })
                      })  
                      dispatch(loadingSuccess(cardUsers));                      
                  })
                  .catch(err => {
                      console.log(err);
                      dispatch(loadingFail(err));                    
                  })
    }
  }
}