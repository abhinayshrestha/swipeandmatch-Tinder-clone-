import React from 'react';
import './RippleLoader.css';

const RippleLoader = props => {
    const style= {
        width : '100%',
        height : '100vh',
        position : 'relative'
    }
          return(
                    <div style={style}>
                        <div>
                            <div className="pulse-button">
                               <img src={ props.profileUrl || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'} alt='loading'/>
                            </div>
                        </div>
                    </div>    
                )     
}

export default RippleLoader;