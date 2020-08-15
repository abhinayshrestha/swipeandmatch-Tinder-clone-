import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-materialize';

const navigationItem  = props => {
    let active = null;
    if(props.id===props.active){
        active = 'active';
    }
    return (
        <Col s={4} m={4} className='mob-nav-item'>
                <Link to={props.link}> 
                  <i id={props.id}
                   className={props.classname.split(" ").concat(active).join(" ") }
                   ></i></Link>
        </Col>
    )
}

export default navigationItem;