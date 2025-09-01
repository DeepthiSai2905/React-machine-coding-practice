import React, { useEffect, useState } from 'react'
import '../css/progressbar.css'

// should be solve in 15-20min - 
// how to add accessibility - give a role
// add animation - btr css
const ProgressBar = ({progress}) => {
    const [animatedProgress, setAnimatedProgress]=useState(0);

    useEffect(()=>{
        setTimeout(() => {
            setAnimatedProgress(progress)
        }, 100);
    },[progress])
  return (
    <>
    <div className='outer'> 
        <div className='inner' 
            style={{
                // width: `${progress}%`}} - repaint the whole css not good practice
                transform: `translateX(${animatedProgress-100}%)`,
            }}
            role="progressbar"
            aria-valuemax={100}
            aria-valuenow={animatedProgress}
            aria-valuemin={0}
        >
            {animatedProgress}%
        </div>
    </div>
    </>

  )
}

export default ProgressBar