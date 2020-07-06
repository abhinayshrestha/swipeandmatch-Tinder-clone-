import React from 'react';
import { withRouter } from 'react-router-dom';
import './UserProfile.css';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { Divider } from 'react-materialize';

const UserProfile = props => {
    if(props.history.action === "POP"){
        props.history.push('/app');
    }
    const { user } = props.location.state;
    const settings = {
        customPaging: i => {
            return (
              <div className='carousal-dots'></div>
            );
          },
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed : 3000,
        arrow: true
      };
    return (<div style={{overflowX:'hidden',background :'#fff'}}>
                <div className='user-image-carousel'>
                    <Slider {...settings} className='carousel-image'>
                        <div className='image-back'>
                            <img src={user.url} alt='img'/>
                        </div> 
                        <div className='image-back'>
                            <img src='http://eskipaper.com/images/fashion-photo-model-girl-beauty-1.jpg' alt='img'/>
                        </div>
                        <div className='image-back'>
                            <img src='https://ihelpf9.com/wp-content/uploads/2015/09/15.jpg' alt='img'/>
                        </div>       
                    </Slider>
                    <Link to='/app'
                         className='btn-floating home-nav-btn'>
                        <i className='fa fa-arrow-up right'></i>
                    </Link>
                 </div>  
                 <div className='user-profile-padding'>
                     <h5><b className='text-flow'>{user.name}, {user.age}</b></h5> 
                     <div className='blue-text text-darken-2' style={{marginBottom: '15px',fontSize : '0.8rem'}}>
                       <i className='fa fa-map-marker blue-text text-darken-2'
                         style={{fontSize:'15px'}}></i> {user.distance} away
                     </div>             
                 </div> 
                 <Divider />  
                 <div style={{padding : '15px 13px'}}>
                     <div className='red-text'>
                         <b>About me</b>
                         <div className='about-me-section grey-text text-darken-2'
                         style={{marginTop : '10px',fontSize : '0.9rem'}}>
                            <i 
                               className='fa fa-university grey-text text-darken-2'
                               style={{fontSize : '13px'}}></i> Tribhuvan University                        
                         </div>
                         <div className='about-me-section grey-text text-darken-2'
                         style={{marginTop : '10px',fontSize : '0.9rem'}}>
                            <i>
                              "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe."  
                            </i>                            
                         </div>    
                     </div>            
                 </div>  
                 <Divider />                   
                 <div style={{padding : '15px 13px'}}>
                     <div className='red-text'>
                         <b>Hobbies</b>
                         <div className='about-me-section grey-text text-darken-2'
                         style={{marginTop : '10px',fontSize : '0.9rem'}}>
                              Cricket Football Dancing
                         </div>    
                     </div>            
                 </div> 
                 <Divider /> 
            </div>
          )
}

export default withRouter(UserProfile);
