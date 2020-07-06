import React, { Component } from 'react'
import { connect } from 'react-redux';
import Profile from '../../Component/Profile/Profile';

class ProfileContainer extends Component {
    render() {
        return <Profile 
                  profileUrl ={this.props.profileUrl}
                  name = {this.props.name}
                  personalInfo = {this.props.about}/>
    }
}

const mapStateToProps = state => {
    return {
        profileUrl : state.userReducer.profileUrl,
        name : state.userReducer.name,
        about : state.userReducer.academics
    }
}

export default connect(mapStateToProps)(ProfileContainer);