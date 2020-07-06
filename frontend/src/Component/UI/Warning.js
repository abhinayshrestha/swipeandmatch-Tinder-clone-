import React from 'react';
import './Warning.css';
import { ReactComponent as Logo } from '../../Assets/Webimages/logo.svg';

const Warning = props => {
    return <div className='warning-backdrop'>
               {props.show ?  <div className='warning-box'>
                       <div className='logo'>
                               <center> <Logo /></center>
                        </div>   
                        <div>
                            Swipe wants to access your location in order to show people near you. Please 
                            allow the location service of your browser to use Swipe.    
                        </div>    
                        <div className='warning-bottom gradient-color'>
                              Thankyou  
                        </div>    
                 </div> : null }  
           </div>
}

export default Warning;