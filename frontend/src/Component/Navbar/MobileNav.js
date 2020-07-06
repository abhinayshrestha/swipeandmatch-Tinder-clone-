import React,{ Component } from 'react';
import './Navbar.css';
import { Row } from 'react-materialize';
import NavigationItem from './NavigationItem/NavigationItem';
import { withRouter } from 'react-router-dom';

class MobileNav extends Component {
    state = {
        navStyle : [
            {link:'/app/profile',style : 'fa fa-user',id:'profile'},
            {link:'/app',style : 'fa fa-heart',id:'app'},
            {link:'/app/message',style : 'fa fa-comments',id:'message'}
        ]
    }  
    render(){
        const active =this.props.location.pathname.slice(this.props.location.pathname.lastIndexOf('/')+1);
        return (
            <Row className='mob-nav center gradient-color'>
                 {this.state.navStyle.map((styles , index) => {
                     return <NavigationItem 
                             key={index}   
                             link={styles.link}
                             classname={styles.style}
                             id={styles.id}
                             active={active}/>
                 })}
            </Row>    
        );
    }
}

export default withRouter(MobileNav);