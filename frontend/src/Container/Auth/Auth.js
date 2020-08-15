import React, { Component } from 'react';
import { Button,Col,Row,Modal,Icon } from 'react-materialize';
import './Auth.css';
import { ReactComponent as Logo } from '../../Assets/Webimages/logo.svg'; 
import { Link } from 'react-router-dom';
import Signupform from '../../Component/Authform/Signupform';
import { connect } from 'react-redux';
import SignupOTPform from '../../Component/Authform/OTPform/SignupOTPform';
class Auth extends Component {
    state = {
        loading : false
    }
    render() {
        const signup = (<Button waves='light' className='button z-depth-0 signupbutton'>
                           Get started
                        </Button>);
        const closeModal = <Button waves='light' className='btn-floating grey grey-lighten-1 white-text modal-close-btn'  modal="close" flat><Icon tiny>close</Icon></Button>                                
        return (
           <div className = 'auth-body'>  
               <Row className='container nav'>
                        <Col s={6} l={6} >
                            <Link to='/' className="brand-logo left">
                                <div className="valign-wrapper links" > 
                                        <Logo className="icon"/> swipe                                
                                </div>
                            </Link>
                        </Col>
                </Row>
                        <center className='body-container container'>
                            <div className='caption'>
                                <h1 className='h1 white-text flow-text'>
                                   Find Your Match Through Swipe
                                </h1>
                                <p className='white-text paragraph'>Get started with email or phone number to start swipping</p>
                                <Modal className='modal'  trigger={signup}
                                    options={{inDuration : 80,outDuration : 80,preventScrolling : false, endingTop:'0%'}}
                                     actions={closeModal}>
                                    {!this.props.showSignupOTPForm ?<Signupform /> : <SignupOTPform />}
                                </Modal>
                             </div>   
                         </center>  
                </div>    
        );
    }
}
const mapStateToProps = state =>{
    return{
        showSignupOTPForm : state.authReducer.showSignupOTPForm
    }
}

export default connect(mapStateToProps)(Auth);