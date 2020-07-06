import React from 'react';
import Setting from '../Setting/Setting';
import './DesktopSetting.css';
import {useSpring, animated} from 'react-spring';



const DesktopSetting = props => {
    const {left} = useSpring({
        config: { duration: 350 },
        from: {left : -500 },
        to: {left : 0 }
      })
    return <animated.div className='desktop-setting' style={{ left : left.interpolate(left => `${left}px`) }}>
              <Setting isDesktop = {true} {...props}/>
          </animated.div>
}

export default DesktopSetting;