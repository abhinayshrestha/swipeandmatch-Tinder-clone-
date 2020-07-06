import React, { Component } from 'react'
import SwipeCard from '../../Component/SwipeCard/SwipeCard';
import { connect } from 'react-redux';
import Warning from '../../Component/UI/Warning';
import * as cardActions from '../../Store/Actions/CardActions';
import * as action from '../../Store/Actions/CardActions';
import RippleLoader from '../../Component/UI/RippleLoader';

class Cards extends Component {
    state = {
        cards : this.props.cards,
        allowLocation : false,
        showModal : false
    }
    swipeHandler = (direction,index) => {
        if(direction === -1 || direction === 1){
            this.props.removeCard(direction,this.props.cards[index].id,this.props.cards[index].liked);
        }
    }
    componentDidMount() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                    this.setState({
                        ...this.state,
                        allowLocation : true,
                        showModal : false
                    },this.props.loadCards(localStorage.getItem('token'),position.coords.latitude,position.coords.longitude))
                },err =>{
                    switch(err.code){
                        case err.PERMISSION_DENIED : this.setState({
                                                        ...this.state,
                                                            allowLocation : false,
                                                            showModal : true
                                                      })
                                                     break;
                        default : console.log('unknown error occured');
                                  break;                                           
                    }
                })
            }
            else{
                console.log('Please enable the location service of your device');
            }
    }
    render() {
        const style={
            position: 'fixed',
            overflow: 'hidden',
            width: `${ this.props.desktop ? '75%' : '100%' }`,
            height: `${ this.props.desktop ? '90%' : '100%' }`,
            zIndex: '9',
            cursor : 'hand',
            background : `${ this.props.desktop ? '#e9ebee' : '#fff' }`,
            padding : `${ this.props.desktop ? '30px 0% 0% 23%' : '0%' }`
        }
        return (
           <div>{!this.props.cardLoader ?
                    <div id='card-root' style={style} >
                        {!this.state.allowLocation ?  <Warning show={this.state.showModal}/> : <SwipeCard cards={this.props.cards} swipeCheck={this.swipeHandler} desktop = {this.props.desktop}/>}         
                    </div> :
                    <RippleLoader profileUrl = {this.props.profileUrl} />
           }</div>    
        )
    }
}

const mapStateToProps = state => {
    return {
        profileUrl : state.userReducer.profileUrl,        
        cards : state.cardReducer.cards,
        cardLoader : state.cardReducer.cardLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeCard : (direction,id,liked) => dispatch(action.removeCard(direction,id,liked)),
        loadCards : (token,lat,lng) => dispatch(cardActions.loadCards(token,lat,lng))        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cards);
