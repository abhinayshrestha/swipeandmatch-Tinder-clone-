import React, { Component } from 'react';
import './Edit.css';
import InputFiles from 'react-input-files';
import { Chip, DatePicker } from 'react-materialize';
import { connect } from 'react-redux';
import * as userActions from '../../Store/Actions/UserActions';
import SimpleLoader from '../../Component/UI/SimpleLoader';
import axios from 'axios';

const loaderStyle = {
    height : '130px',
    position : 'absolute',
    top : '50%',
    left : '0%',
    transform : 'translate(-30%,-40%)'
 }

class Edit extends Component {
    state = {
        academics : this.props.academics,
        quote : this.props.quotations,
        name : this.props.name,
        birthday : new Date(this.props.birthday),
        hobbies : this.props.hobbies,
        musics : this.props.musics,
        loading : false,
        pploading : false
    }
    addFileHandler = files => {
        this.setState({
            ...this.state,
            loading : true
        })
        const fd = new FormData();
        fd.append('photo',files[0],files[0].name);
        axios.post('http://localhost:8080/file/upload',
                    fd,
                    { headers : { Authorization : `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                this.setState({
                    ...this.state,
                    loading : false
                },() => this.props.addPhoto(response.data.data))
            })
            .catch(err => {
                this.setState({
                    ...this.state,
                    loading : false
            }, () =>  console.log(err))
            })
    }
    removeFileHandler = i => {
        const data = {
            url : this.props.images[i]
        };
        axios.put('http://localhost:8080/file',
                data,
                { headers : { Authorization : `Bearer ${localStorage.getItem('token')}` } }          
              )
              .then(response => {
                    this.props.removePhoto(i);
              })
              .catch(err => {
                  console.log(err);
              })
    }
    profilePicHandler = files => {
            this.setState({
                ...this.state,
                pploading : true
            })
            const fd = new FormData();
            fd.append('profilepic',files[0],files[0].name);
            axios.put('http://localhost:8080/file/profilepic',
                        fd,
                        { headers : { Authorization : `Bearer ${localStorage.getItem('token')}` } }
            ).then(response => {
                this.setState({
                    ...this.state,
                    pploading : false
                },() => this.props.changeProfilePic(response.data.message.profileUrl))
            })
            .catch(err => {
                console.log(err);
            })
    }
    updateHandler = () => {
        this.props.updateProfile(this.state);
    }
    dateChangeHandler = value => {
        this.setState({
            ...this.state,
            birthday : new Date(value)
        })
    }
   
     render() {
        let album = [];
        let counter=0;
         for(let i=0 ; i<=4; i++){
            album.push(
                <center key={i} className='image-row col s4 l4 m4'>
                       {this.props.images[i] ? 
                                <div className='grey lighten-2 image-album'>
                                    <img src={this.props.images[i]} alt='img'/>
                                    <button className='image-remove-btn' onClick={this.removeFileHandler.bind(this,i)}>
                                        <i className='fa fa-minus red-text center'></i>  
                                    </button> 
                                    <span style={{display :'none'}}>{++counter}</span>  
                                </div>
                        :
                                <div className='grey lighten-2 image-album'>
                                    {!this.state.loading ? <InputFiles onChange={files => this.addFileHandler(files)} multiple = {false}>
                                        <button className='image-add-btn gradient-color waves-effect waves-light'>
                                            <i className='fa fa-plus white-text center'></i>
                                        </button>
                                    </InputFiles>  :  counter===i ? <SimpleLoader loaderStyle = {loaderStyle}/> : 
                                <InputFiles onChange={files => this.addFileHandler(files)} multiple = {false}>
                                        <button className='image-add-btn gradient-color waves-effect waves-light'>
                                            <i className='fa fa-plus white-text center'></i>
                                        </button>
                                </InputFiles>
                                }
                                </div>
                        }
                </center>  
            )
         }
         const chipSetting = {
                    data: this.state.hobbies,
                    placeholder: 'Enter a tag',
                    secondaryPlaceholder: '+Tag',
                    limit : 6,
                    onChipAdd : data => this.setState({...this.state, hobbies : data[0].M_Chips.chipsData}),
                    onChipDelete : data => this.setState({...this.state, hobbies : data[0].M_Chips.chipsData})
         }
         const musicChipSetting = {
            data: this.state.musics,
            placeholder: 'Enter a tag',
            secondaryPlaceholder: '+Tag',
            limit : 6,
            onChipAdd :  data => this.setState({...this.state, musics : data[0].M_Chips.chipsData}),
            onChipDelete :  data => this.setState({...this.state, musics : data[0].M_Chips.chipsData})
        }
         const datePickerConfig = {
             format : 'yyyy-mm-dd',
             defaultDate : new Date(this.state.birthday),
             setDefaultDate : true,
             minDate : new Date('1945-01-01'),
             maxDate : new Date('2005-01-01')
         }
         let profilePage = <div className='edit'>
                            { !this.props.desktop ? <div className='fix-nav'> <div className='setting-top'>
                               <div className='back btn waves-effect waves-grey transparent z-depth-0 blue-text text-lighten-2'
                                    onClick = {() => this.props.history.push('/app/profile')}>
                                       <i className='fa fa-chevron-left left blue-text' style={{fontSize : '15px',marginRight: '5px'}}></i> 
                                        Back
                                </div> 
                                       Edit
                                <div className='save btn waves-effect waves-grey transparent z-depth-0 blue-text text-lighten-2'
                                    onClick = {this.updateHandler}>
                                        Save
                                </div>    
                            </div>
                            </div> 
                            :   <center>
                                        <button className='white-text z-depth-4 waves-effect waves-light desktop-save-btn'
                                        onClick = {this.updateHandler}>
                                                SAVE
                                        </button>   
                                </center>  }
                            <div className='row image-upload-section' style={{width : '100%',marginLeft :'0px'}}>
                                <center className='image-row col s4 l4 m4'>
                                <div className='grey lighten-2 image-album'>
                                 {!this.state.pploading ?<div> <img src={this.props.profileUrl} alt='img'/>
                                            <InputFiles onChange={files => this.profilePicHandler(files)} multiple = {false}>
                                                <button className='image-remove-btn'>
                                                    <i className='fa fa-minus red-text center'></i>
                                                </button>
                                            </InputFiles></div> : <SimpleLoader loaderStyle = {loaderStyle}/>} 
                                        </div>
                                </center>
                                {album}
                            </div>
                            <div className='row red-text' 
                                style={{marginTop : '20px' , fontSize : '17px',width : '100%',marginLeft :'0px',paddingLeft : '15px'}}>
                                <b>About Me</b>
                            </div>    
                            <div className='container grey-text text-accent-3' 
                                style={{fontSize : '13px',width : '100%',padding :'10px 15px'}}>
                                <b>Name</b>
                            </div>   
                            <div className='white'> 
                                <div style={{paddingLeft : '15px'}}>
                                <input type='text' 
                                        value={this.state.name} 
                                        onChange={(e) => this.setState({name : e.target.value})}
                                        className ='browser-default academic-box' />
                                </div>      
                            </div>
                            <div className='container grey-text text-accent-3' 
                                style={{fontSize : '13px',width : '100%',padding :'10px 15px'}}>
                                <b>Date Of Birth</b>
                            </div>   
                            <div className='white'> 
                                <div style={{paddingLeft : '10px',height : '40px',position:'relative'}}>
                                    <DatePicker onChange={this.dateChangeHandler} 
                                                className='browser-default date-picker' 
                                                readOnly = 'readonly' 
                                                options={datePickerConfig}/>
                                </div>      
                            </div>
                            <div className='container grey-text text-accent-3' 
                                style={{fontSize : '13px',width : '100%',padding :'10px 15px'}}>
                                <b>Academic & Jobs</b>
                            </div>   
                            <div className='white'> 
                                <div style={{paddingLeft : '15px'}}>
                                <input type='text' 
                                        value={this.state.academics} 
                                        onChange={(e) => this.setState({academics : e.target.value})}
                                        className ='browser-default academic-box' />
                                </div>      
                            </div>
                            <div className='container grey-text text-accent-3' 
                                style={{fontSize : '13px',width : '100%',padding :'10px 15px'}}>
                                <b>Your quotation</b>
                            </div>    
                            <div className='white' style={{paddingBottom:'10px'}}> 
                                <div style={{paddingLeft : '15px'}}>
                                <textarea type='text' 
                                        value={this.state.quote} 
                                        onChange={(e) => this.setState({quote : e.target.value})}
                                        className ='browser-default academic-box container' />
                                </div>      
                            </div> 
                            <div className='row red-text container' 
                                style={{margin: '15px auto' , fontSize : '17px',width : '100%',marginLeft :'0px',paddingLeft : '15px'}}>
                                <b>Hobbies</b>
                            </div>
                            <div className='white'> 
                                <div className='white' style={{margin : '0px auto'}}>
                                    <Chip options={chipSetting} 
                                        onChange = {value => console.log('ok')}/>
                                </div>      
                            </div>    
                            <div className='row red-text container' 
                                style={{margin: '15px auto' , fontSize : '17px',width : '100%',marginLeft :'0px',paddingLeft : '15px'}}>
                                <b>Music & Entertainment</b>
                            </div>
                            <div className='white'> 
                                <div className='white' style={{margin : '0px auto'}}>
                                    <Chip options={musicChipSetting} 
                                        onChange = {value => console.log('ok')}/>
                                </div>      
                            </div>   
                        </div>
        return !this.props.loading ? profilePage : <SimpleLoader />;
    }
}

const mapStateToProps = state => {
    return {
        name : state.userReducer.name,
        birthday : state.userReducer.birthday,
        academics : state.userReducer.academics,
        quotations : state.userReducer.quotations,
        hobbies : state.userReducer.hobbies,
        musics : state.userReducer.musics,
        loading : state.userReducer.updateLoader,
        profileUrl : state.userReducer.profileUrl,
        images : state.userReducer.photos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateProfile : (userInfo) => dispatch(userActions.updateProfile(localStorage.getItem('token'),userInfo)),
        addPhoto : (url) => dispatch(userActions.addPhoto(url)),
        removePhoto : i => dispatch(userActions.removePhoto(i)),
        changeProfilePic : path => dispatch(userActions.updateProfilePic(path))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Edit);
