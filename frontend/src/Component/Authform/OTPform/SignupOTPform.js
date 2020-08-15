import React, { Component } from 'react';
import {ReactComponent as Logo} from '../../../Assets/Webimages/logo.svg';
import { Button,Icon,Row,Col } from 'react-materialize';
import { connect } from 'react-redux';
import * as actionTypes from '../../../Store/Actions/ActionTypes';
import OtpInput from 'react-otp-input';
import './style.css';
import Aux from '../../../Hoc/ReactAux';
class SignupOTPform extends Component {
    state = {
        opt: null,
        isvalid : false
    }
    changeHandler = (otp)=> {
        this.setState({otp : otp},()=>{
            if(otp.length === 5){
                this.setState({
                    isvalid : true
                })
            }
            else{
                this.setState({
                    isvalid : false
                }) 
            }
        });
    }
    render() {
        return (
            <Aux>
            <Button
                    floating
                    small
                    className="gradient-color left z-depth-0"
                    waves="light"
                    onClick= {this.props.goBack}
                    icon={<Icon>arrow_back</Icon>}
               />
            <div className='container'>
              
               <div className='center logo'> <Logo /></div>
               <h5 className='center'>Enter Your Code</h5>
               <center className='grey-text text-darken-1'>Resend your code 
                   <span className=' blue-text'> Resend</span>
               </center>
               <Row >
                  <Col l={6} m={6} s={6} push='l3 s1'> 
                        <OtpInput
                                containerStyle= 'otp-container'
                                shouldAutoFocus={true}
                                onChange={otp => this.changeHandler(otp)}
                                numInputs={5}
                                inputStyle='browser-default otp-input'
                                value={this.state.otp}
                                separator={<span>   </span>}
                                />
                   </Col>             
                </Row>    
                <div className='center'>
                 <Button waves='light' disabled={!this.state.isvalid} 
                      className='center z-depth-0 otp-submit'>Submit</Button>   
               </div>
            </div>
            </Aux>    
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        goBack : () => dispatch({type : actionTypes.HIDE_SIGNUP_OTP_FORM})
    }
}
export default connect(null,mapDispatchToProps)(SignupOTPform);