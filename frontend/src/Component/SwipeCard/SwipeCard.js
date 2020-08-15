import React, { useState } from 'react';
import { useSprings,animated, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import './CardStyle.css';
import { Link } from 'react-router-dom';
 

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({ x: 0, y: 0, scale: 1, rot:0, delay: i * 100,o:0 })
const from = i => ({ x: 0, rot: 0, scale: 1, y: 0,o:0 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(1500px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(${s})`
function Deck(prop) {
  const getDirection = (direction,index) => {
       prop.swipeCheck(direction,index);
  }
  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [classes,setClasses] = useState('fa fa-thumbs-up black darken-5 blue-text');
  const [props, set] = useSprings(prop.cards.length, i => ({ ...to(i), from: from(i) })) // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity 
  const bind = useGesture(({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
    let trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
    let dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
    xDelta < 0 ? setClasses('fa fa-thumbs-down black darken-5 red-text right') : setClasses('fa fa-heart black darken-5 blue-text');
    if (!down && trigger && Math.abs(xDelta) > 100) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    set(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index);
      const o =down ? Math.abs(xDelta/300) : 0;
      if (isGone)
      {
          getDirection(dir,index);          
      }
      const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1 : 1 // Active cards lift up a bit
      return { x, rot, scale,o, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 150 : 500 } }
    })
  })
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return props.map(({ x, y, rot, scale,o}, i) => (
    <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate(${x}px)`),width : `${prop.desktop ? '380px' : '100%'}` }}>
      {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
      <animated.div {...bind(i)} style={{ transform: interpolate([rot, scale], trans) }}>
          <animated.section className={classes} style={{ opacity  : o.interpolate( o => `${Math.abs(o)}`) }} id='like-dislike' />
                  <div 
                  style={{ background : `url(${prop.cards[i].url})`, backgroundSize : 'cover',backgroundPosition: 'center top', backgroundRepeat:'no-repeat' }}>
                  <div className='card-controller' style={{width : '100vw'}}>
                      <center>
                          <div>
                             <h5 className='text-flow card-name'>
                                  <b>
                                  {prop.cards[i].name}, {prop.cards[i].age}
                                  </b>
                            </h5>
                             <div className='distance'>{prop.cards[i].distance} away</div>
                          </div>  
                          <button className='btn-floating btn-large white z-depth-3 waves-effect waves-grey'
                           style={{margin : '0px 20px'}}>
                            <i className='fa fa-thumbs-down orange-text text-darken-1' style={{fontSize : '30px'}}></i>
                          </button>
                          <Link to={{pathname : 'app/user/profile' , state : {user : prop.cards[i]}}}
                               className='btn-floating white z-depth-3 waves-effect waves-grey' 
                               style={{margin : '0px 20px'}}>
                            <i className='fa fa-info blue-text text-darken-1' style={{fontSize : '20px'}}></i>
                          </Link>
                          <button className='btn-floating btn-large white z-depth-3 waves-effect waves-grey'
                               style={{margin : '0px 20px'}}>
                            <i className='fa fa-heart pink-text' style={{fontSize : '30px'}}></i>
                          </button>
                      </center>   
                   </div> 
                  </div>
      </animated.div>
    </animated.div>
  ))
}


export default Deck;
