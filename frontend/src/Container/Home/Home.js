import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userAction from '../../Store/Actions/UserActions';
import MobileNav from '../../Component/Navbar/MobileNav';
import Media from 'react-media';
import { Switch ,Route, withRouter , Redirect, Link } from 'react-router-dom';
import Aux from '../../Hoc/ReactAux';
import Cards from '../Cards/Cards';
import ProfileContainer from '../ProfileContainer/ProfileContainer';
import Message from '../../Component/Message/Message';
import Setting from '../../Component/Setting/Setting';
import UserProfile from '../../Component/UserProfile/UserProfile';
import Edit from '../Edit/Edit';
import './Home.css';
import DesktopEdit from '../../Component/DesktopEdit/DesktopEdit';
import DesktopTips from '../../Component/DesktopTips/DesktopTips';
import DesktopUserProfile from '../../Component/DesktopUserProfile/DesktopUserProfile';
import RippleLoader from '../../Component/UI/RippleLoader';
import SimpleLoader from '../../Component/UI/SimpleLoader';
import DesktopSetting from '../../Component/DesktopSetting/DesktopSetting';
import Matches from '../../Component/Matches/Matches';

class Home extends Component {

    componentDidMount() {
            this.props.loadUserData(localStorage.getItem('token'));
        }
    render() {
        return (
            <div style={{height : '0px'}}>
               <Media query="(max-width: 900px)">
                    {matches =>
                        matches ? (
                          <Aux>
                                <MobileNav />
                                {!this.props.userDataLoader ? <Switch>
                                    <Route path = '/app/profile' exact component={ProfileContainer} />                                    
                                    <Route path = '/app/message' exact component={Matches} />
                                    <Route path = '/app/message/chat' exact component={Message} />                                                                                                            
                                    <Route path = '/app' exact component={Cards} />
                                    <Route path = '/app/profile/setting' exact component={Setting} />
                                    <Route path = '/app/user/profile' exact render={() => <div className='user-profile'> <UserProfile/></div>} />                                    
                                    <Route path = '/app/profile/edit' exact component={Edit} />                                    
                                    <Redirect to='/app' />
                                </Switch>
                                  :
                                  <RippleLoader profileUrl = {this.props.profileUrl} />   
                                }
                           </Aux>     
                        ) : (
                        <div id='desktop-view' style={{overflow : 'hidden'}}>
                            <div className='row'>
                                <div className='col l3 m3 s3 box' style={{padding : '0px',background : '#e9ebee'}}>
                                   <div className='desktop-left-panel'>
                                      <div className='desktop-nav-bar z-depth-2'>
                                            {this.props.location.pathname === "/app/profile/setting" ? 
                                            <Link to='/app'
                                                 className='col s3' style={{height : '100%',position : 'relative'}}>
                                                 <i className='fa fa-angle-left back-icon white-text' style={{fontSize : '30px'}}></i>
                                                 <div className='desktop-profile-icon grey'>
                                                       <img src={this.props.profileUrl || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'} alt=''/>                                                           
                                                  </div>   
                                            </Link>
                                             :
                                             <Link to= {this.props.match.path+'/profile/setting'}
                                                  className='col s3' style={{height : '100%',position : 'relative'}}>
                                                  <div className='desktop-profile-icon grey'>
                                                        <img className='responsive-img circle' src={this.props.profileUrl || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'} alt=''/>                                                           
                                                   </div>   
                                             </Link>
                                            }
                                             <div className='col s9' style={{height : '100%',position : 'relative'}}>
                                                  <div className='desktop-profile-name'>
                                                           {this.props.name.split(" ")[0]}
                                                   </div>   
                                             </div>   
                                       </div> 
                                       <div>
                                       {!this.props.userDataLoader 
                                            ?  
                                           <Switch>
                                                <Route path='/app/profile/setting' component={DesktopSetting}/>
                                                <Route path = '/app/user/profile' component={DesktopTips} />                                                                                                                                                                                        
                                                <Route path='/app' exact component={DesktopTips}/>
                                                <Redirect to='/app' />
                                           </Switch>         
                                           :
                                           <SimpleLoader />  }                                     
                                       </div>   
                                    </div>        
                                </div>
                                <div className='col l9 m9 s9 desktop-right-panel' style={{padding : '0px'}}>
                                            <Switch>
                                                <Route path = '/app/user/profile' component={DesktopUserProfile} />                                                                                                                                        
                                                <Route path='/app/profile/setting' component={DesktopEdit}/>
                                                <Route path='/app/' render={() => <Cards desktop={true}/>}/>
                                                <Redirect to='/app' />
                                            </Switch> 
                                         {this.props.location.pathname === '/app' ?  <center style={{position : 'absolute' , bottom :'20px'}} className='desktop-tips grey-text text-lighten-1'>
                                              <p style={{marginLeft : '30px'}}>
                                                   Swipe left or click <i className='fa fa-thumbs-down yellow-text text-darken-4'></i> to unlike 
                                                   Swipe right or click <i className='fa fa-heart pink-text'></i> to unlike 
                                                   click <i className='fa fa-info blue-text'></i> to view their profile 
                                               </p>    
                                           </center> : null
                                        }
                                </div>    
                            </div>
                        </div>
                        )
                    }
               </Media>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        profileUrl : state.userReducer.profileUrl,
        name : state.userReducer.name,
        userDataLoader : state.userReducer.loading,
        lookingFor  : state.userReducer.setting.showOnly
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUserData : (token) => dispatch(userAction.getUserData(token))
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home));