import React from 'react';
import './DesktopTips.css';

const DesktopTips = () => {
    return (
                     <center style= {{background:'#fff',height:'calc(100vh - 70px)', paddingTop : '20%'}}>
                         <div className='desktop-tips-card'></div>
                          <div className='container'>
                                <h5 style={{margin : '30px auto 10px auto'}}>
                                    <b>Get Swipping</b>    
                                </h5>
                                <p className='grey-text text-accent-1' style={{fontSize : '14px',fontWeight :'600',lineHeight:'25px'}}>
                                    You'll start seeing matches here once you start swipping, when you find one you can start to chat from here  
                                </p>  
                          </div>
                      </center>
            )
}

export default DesktopTips;