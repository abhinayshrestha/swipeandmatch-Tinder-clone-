import React from 'react';
import Edit from '../../Container/Edit/Edit';
import './DesktopEdit.css';
import ReactAux from '../../Hoc/ReactAux';

const DesktopEdit = props => {
    return (
          <ReactAux>
            <div className='desktop-edit z-depth-4'>  
                <Edit desktop={true}/>
            </div>
            </ReactAux>   
            );
}

export default DesktopEdit;