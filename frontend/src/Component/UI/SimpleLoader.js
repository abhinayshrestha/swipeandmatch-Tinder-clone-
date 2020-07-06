import React from 'react';
import './SimpleLoader.css';

const SimpleLoader = props => {
    return <div>
                    <div className="loader-container" style={props.loaderStyle}>
                            <div className="loader" id="loader-1"></div>
                    </div>
           </div>
}

export default SimpleLoader;