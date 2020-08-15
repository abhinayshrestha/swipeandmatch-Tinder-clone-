import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import './Matches.css';
import { Link } from 'react-router-dom';

class Matches extends Component {
    state = {
        matches : []
    }
    componentDidMount(){
        const matchId = {
            matches : this.props.matches
        }
        axios.post('http://localhost:8080/cards/matches',
            matchId,
            { headers : { Authorization : `Bearer ${localStorage.getItem('token')}` } } 
        )
        .then(response => {
            this.setState({
                ...this.state,
                matches : [...response.data.message]
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    render() {
        return (
            <div className='match-container'> 
                  {this.state.matches.map((match,index) => {
                      return <Link to = {{ pathname : 'message/chat' , state : { chatUser : this.state.matches[0] }}} key={index}><div className='match-user'>
                                <div className='match-pic'>
                                   <img src={match.profileUrl} className='responsive-img' alt='...'/>
                                    
                                </div>
                                <div className='match-name'>
                                    {match.name.split(" ")[0]}
                                </div>
                            </div>
                            </Link> 
                  })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        matches : state.userReducer.matches
    }
}

 export default connect(mapStateToProps)(Matches);