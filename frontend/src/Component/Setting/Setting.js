import React, {useState} from 'react';
import './Setting.css';
import ReactAux from '../../Hoc/ReactAux';
import '../../Styles/slider.css';
import InputRange from 'react-input-range';
import { Dropdown, Divider } from 'react-materialize';
import { ReactComponent as Logo } from '../../Assets/Webimages/logo.svg';
import * as actions from '../../Store/Actions/AuthActions';
import * as userActions from '../../Store/Actions/UserActions';
import { connect } from 'react-redux';

const Setting = props => {
    const [distanceValue, setDistanceValue] = useState(props.distance);
    const [ageRange, setAgeRange] = useState({ min: props.minAge , max: props.maxAge})
    const [lookingFor , setLookingFor] = useState(props.showOnly);
    const handleDistanceChange = value => {
        setDistanceValue(value);
    }
 
    const handleAgeChange = value => {
        if(value.max - value.min <= 3) return;
        setAgeRange(value);
    }

    const setToMale = () => {
        setLookingFor('male');
    }

    const setToFemale = () => {
        setLookingFor('female');
    }

    const logoutHandler = () => {
        props.logout();
    }
    const updateHandler = () => {
        const setting = {
            ageRange : ageRange,
            showOnly : lookingFor,
            distance : distanceValue
        }
        props.updateSetting(localStorage.getItem('token'),setting);
        if(props.isDesktop){
            props.history.push('/app/profile/setting');
        }
        else{
            props.history.push('/app/profile');
        }
    }
     return (
        <ReactAux>
            <div style={{backgroundColor :'#e9ebee',overflowX:'hidden'}} className='setting'>  
              <div className='fix-nav'>          
                    <div className='setting-top'>
                        Settings
                        <div className='save btn waves-effect waves-grey transparent z-depth-0 blue-text text-lighten-2'
                             onClick = {updateHandler}>
                                Done
                        </div>    
                    </div>
                </div>
                <div className='red-text' 
                    style={{marginTop : '10px',fontWeight:'600',fontSize:'15px',width:'100%',marginLeft : '10px'}}>
                    Discovery Setting
                </div>
                <div className='row white grey-text text-darken-1'
                     style={{marginTop:'10px',borderTop : '1px solid #ddd',borderBottom : '1px solid #ddd',
                             marginLeft : 0,padding:'15px 5px 10px 5px',fontSize:'15px',width:'100%'}}>
                    <div className='col s12 l12 m12'>
                        Maximum distance
                      <div className='right'>
                         {distanceValue} km
                      </div> 
                    </div> 
                    <div className='col s12 l12 m12' style={{margin : '12px 0px 5px 0px'}}>
                        <InputRange 
                            maxValue={100}
                            minValue={2}
                            value={distanceValue}
                            onChange={handleDistanceChange} 
                            formatLabel={value => false}
                        />
                    </div>    
                </div> 
                <div className='row white grey-text text-darken-1'
                     style={{borderBottom : '1px solid #ddd',padding:'10px',fontSize:'15px',width:'100%',marginLeft : 0}}>
                    <div className='col s7 l7 m7 white z-depth-0 grey-text text-darken-1'
                       style={{padding : '10px 5px'}}>
                        Show Only
                    </div>    
                    <div className='col s3 l3 m3'>
                      <Dropdown
                       trigger={
                            <button className='dropdown-btn btn white z-depth-0 grey-text text-darken-1'>
                              {lookingFor} 
                            <i className='material-icons right' style={{marginLeft : '0px'}}>
                                    chevron_right
                            </i>
                            </button>
                        }>
                            <div className='dropdown-options btn z-depth-0 waves-effect waves-grey white grey-text text-darken-1' onClick={setToMale}>
                               Male
                            </div>
                            <Divider/>
                            <div className='dropdown-options btn z-depth-0 waves-effect waves-grey white grey-text text-darken-1' onClick={setToFemale}>
                               Female
                            </div>
                            <Divider/>
                            <div className='dropdown-options btn z-depth-0 waves-effect waves-grey white grey-text text-darken-1' onClick={setToFemale}>
                               Other
                            </div>
                       </Dropdown>     
                      </div> 
                </div>       
                <div className='row white grey-text text-darken-1'
                     style={{padding:'15px 5px 10px 5px',borderBottom : '1px solid #ddd',fontSize:'15px',width:'100%',marginLeft : 0}}>
                    <div className='col s12 l12 m12'>
                        Age Range
                      <div className='right'>
                         {ageRange.min} - {ageRange.max} Yrs
                      </div> 
                    </div> 
                    <div className='col s12 l12 m12' style={{margin : '12px 0px 5px 0px'}}>
                        <InputRange 
                            maxValue={55}
                            minValue={15}
                            value={ageRange}
                            onChange={handleAgeChange} 
                            formatLabel={value => false}
                        />
                    </div>    
                </div>       
                <div className='red-text' 
                    style={{marginTop : '10px',fontWeight:'600',fontSize:'15px',marginLeft : '10px'}}>
                    Notifications
                </div>
                <div className='row white grey-text text-darken-1'
                     style={{borderTop : '1px solid #ddd',borderBottom : '1px solid #ddd',marginTop:'10px',
                            width:'100%',padding:'15px 0px 15px 5px',fontSize:'15px',marginLeft : 0}}>
                    <div className='col s12 l12 m12'>
                        <div style={{display : 'inline-block',paddingTop : '3px'}}>Push Notifications</div>
                      <div className='right'>
                            <div className="switch">
                                        <label>
                                        <input type="checkbox" />
                                        <span className="lever"></span>
                                        </label>
                            </div>
                      </div> 
                    </div>   
                </div> 
                <div className='row grey-text text-darken-1'
                     style={{marginTop:'10px',padding:'15px 0px 15px 5px',width:'100%'}}>
                       <div style={{position : 'absolute',marginLeft :'50%',transform : 'translateX(-50%)'}}> 
                           <Logo />
                        </div>
                </div> 
                <center style={{margin : '40px 0px 30px 0px',fontSize :'15px'}}>Swipe</center>
                <div onClick={logoutHandler} className='row logout-btn waves-effect waves-light'>
                   <center> Log out </center>
                </div> 
            </div>
        </ReactAux>
    )
}

const mapStateToProps = state => {
    return {
        minAge : Number(state.userReducer.setting.ageRange.min) || 18,
        maxAge :  Number(state.userReducer.setting.ageRange.max) || 30,
        distance : Number(state.userReducer.setting.distance) || 20,
        showOnly : state.userReducer.setting.showOnly || 'female'
    }
}

const mapDispatchToProps = dispatch => {
     return {
         logout : () => dispatch(actions.logout()),
         updateSetting : (token, setting) => dispatch(userActions.updateSetting(token, setting))
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);