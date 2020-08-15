import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import { ReactComponent as BottomCurve } from '../../Assets/Webimages/bottomcurve.svg';
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import { connect } from 'react-redux';

const profile = props => {
    const settings = {
        customPaging: i => {
            return (
              <div className='dots'></div>
            );
          },
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay : true,
        autoplaySpeed : 3000,
        arrows: false
      };
    return (
        <div className='profile-container'>
           <div className='profile-section white'>
                <div style={{paddingTop : '5vh'}}>          
                    <div className='profile-pic grey'>
                        <img className='profile-img' src={props.profileUrl || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'} alt=''/>   
                    </div>  
                </div>
                <center>
                    <h5 style={{margin : '10px 0px 0px 0px'}} ><b>{props.name}</b></h5>
                    <div style={{margin : '0px'}} className='grey-text text-darken-1'>
                       {props.personalInfo}
                    </div>
                    <div className='row' style={{marginTop:'10px'}}>
                            <div className="col s4 m4 l4">
                                <Link  to='profile/setting'
                                    className="btn-floating btn-large waves-effect waves-light z-depth-1 white">
                                    <i className='fa fa-cog grey-text' style={{fontSize : '25px'}}></i>
                                </Link>
                                <div 
                                    style={{marginTop : '7px', fontSize : '12px'}}
                                    className='grey-text'><b>Setting</b>
                                </div>
                            </div>
                            <div className='col s4 l4 m4'>
                                <div style={{marginTop : '50%'}}
                                    className="btn-floating btn-large waves-effect waves-light gradient-color">
                                    <span className='white-text' style={{fontSize : '20px'}}>{props.matches}</span>
                                </div>
                                <div style={{marginTop : '10px', fontSize : '12px'}}
                                    className='grey-text'><b>Total Matches</b>
                                </div>
                             </div>  
                             <div className='col s4 l4 m4'>
                                    <Link 
                                        to='profile/edit'
                                        className="btn-floating btn-large waves-effect waves-light white z-depth-1">
                                        <i className='fa fa-pencil grey-text' style={{fontSize : '25px'}}></i>
                                    </Link>
                                    <div style={{marginTop : '10px', fontSize : '12px'}}
                                        className='grey-text'><b>Edit Info</b>
                                    </div>
                             </div>     
                     </div>         
                </center>   
             </div> 
             <div className='white'><BottomCurve /></div>
             <div className='tips'>
                 <Slider {...settings} className='slide-tips container'>
                        <center>
                           <h5 style={{fontSize:'19px',marginBottom : '15px'}}>
                               <i 
                                    className='fa fa-thumbs-up teal-text text-darken-1' 
                                    style={{fontSize:'22px',marginRight :'5px'}}></i>
                               <b> Swipe Right</b>
                            </h5>
                           <div className='grey-text text-darken-4' style={{fontSize:'11px'}}>
                                Swipe right if you like someone
                            </div>
                        </center>  
                        <center>
                           <h5 style={{fontSize:'19px',marginBottom : '15px'}}> 
                               <i 
                                    className='fa fa-thumbs-down  orange-text text-darken-1' 
                                    style={{fontSize:'22px',marginRight :'5px'}}></i>
                                <b>Swipe Left</b>
                            </h5>
                           <div className='grey-text text-darken-4' style={{fontSize:'11px'}}>
                               Swipe left if you have no interest in someone
                            </div>
                            
                        </center> 
                        <center>
                           <h5 style={{fontSize:'19px',marginBottom : '15px'}}>
                               <i 
                                    className='fa fa-heart green-text' 
                                    style={{fontSize:'22px',marginRight :'5px'}}></i>
                                <b>Matches</b>
                            </h5>
                           <div className='grey-text text-darken-4' style={{fontSize:'11px'}}>
                              When both of you like each other it's a match
                           </div>
                        </center> 
                 </Slider>
             </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        matches : state.userReducer.matches.length
    }
}

export default connect(mapStateToProps)(profile);