import React, { Component } from 'react';
import { ReactComponent as Logo } from '../../Assets/Webimages/logo.svg';
import { ReactComponent as Flag } from '../../Assets/Webimages/nepal.svg';
import './style.css';
import { TextInput,Row,Col } from 'react-materialize';
import Aux from '../../Hoc/ReactAux';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/AuthActions';
import FacebookLogin from 'react-facebook-login';
import * as actionTypes from '../../Store/Actions/ActionTypes';
import { withRouter } from 'react-router-dom';

const FacebookLoginButton = ({facebookResponse}) => (
    <FacebookLogin
        icon={<i className='fa fa-facebook-f left' style={{marginRight:'10px'}}></i> }
        appId="351989509051750"
        autoLoad={false}
        fields="name,picture.type(large),gender,birthday"
        scope="public_profile,user_gender,user_birthday"
        callback={facebookResponse}
        cssClass="blue fb-btn btn z-depth-0 "
        state = 'ok'
        isMobile = {false}
        disableMobileRedirect = {true}	
   />  
);



class Signupform extends Component {
    state= {
        phone : '',
        isPhone : true,
        validation : {
            isPhoneValid : false
        },
        showHelper : false
    }

    changedHandler = (event) => {
        if(this.state.isPhone){
            const phone = event.target.value;
            let isValid =false;
            isValid = /^[98][0-9]{9}$/.test(phone);
            this.setState({
                ...this.state,
                [event.target.id] : event.target.value,
                showHelper : true,
                validation : {
                    ...this.state.validation,
                    isPhoneValid : isValid
                }
            })
        }
        
    }
    submitHandler = (e) =>{
             e.preventDefault();          
        this.setState({
        ...this.state,
        showHelper : true
        })
        if(this.state.validation.isPhoneValid){
            this.props.continueOTPHandler()               
          }            
    }

    submitForm = (e) => {
        if(e.key === 'Enter'){
            this.submitHandler(e);
        }
    }
    facebookResponse = (response) => {
        
                    if(response.status ==='unknown'){
                        return ;
                    }
                    const user = { 
                        userId : response.id,
                        name : response.name,
                        profileUrl : response.picture.data.url,
                        birthday : new Date('1996-05-13'),
                        gender : 'male',
                        fbToken : response.accessToken
                     };
                   this.props.onAuth(user);
           
    }
    render() {
        let helper = null;
        if( this.state.isPhone && !this.state.validation.isPhoneValid && this.state.showHelper){
            helper = ( 
                            <div id='error'>
                              <i className='fa fa-exclamation-circle' style={{color :'#c62828'}}></i> 
                              &nbsp;Please Enter valid phone number.
                            </div>
                    ) 
        }
        const infoForm = (
                       <Aux>
                        <div className='container'>
                        <div className='center logo'><Logo /></div>
                        <h4 className='flow-text center grey-text text-darken-2'>
                            Enter Your Mobile number
                        </h4>
                        <form onSubmit={this.submitHandler}>
                    
                            <Row>
                            <Col  s={12} l={12}  m={12} xl={12}>                 
                            <TextInput 
                                value = '+977'
                                s={4}
                                l={3} 
                                m={3}
                                onChange={()=>{}}
                                className='center'
                                icon={<Flag />}
                               />
                               <TextInput 
                                        s={7}
                                        l={9} 
                                        m={9} 
                                        label='Phone'
                                        onChange = {this.changedHandler}
                                        value={this.state.phone}
                                        type="tel"
                                        onKeyDown = {this.submitForm}
                                        id="phone"
                                        autoFocus
                                        />
                            </Col> 
                            </Row> 
                            <div className='colum'>
                                {helper}
                            </div>
                         <div className='grey-text text-darken-1 center'>
                             Signup through number or with facebook account
                         </div>   
                        <div className='input-field center'>
                                <button className='waves-effect waves-light btn z-depth-0 center submit '>Continue</button>
                        </div>                
                        </form>   
                        <div className='grey-text text-darken-1 center' style={{marginTop : '20px' , display: 'block'}} >
                            <div>
                                <FacebookLoginButton facebookResponse={this.facebookResponse} />               
                            </div>
                        </div>
                    </div>
                    </Aux>
             );                                   
        return infoForm;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        continueOTPHandler : () => dispatch({type : actionTypes.SHOW_SIGNUP_OTP_FORM}),
        onAuth : (user) => dispatch(actions.onAuth(user))        
    }
}
export default withRouter(connect(null,mapDispatchToProps)(Signupform));