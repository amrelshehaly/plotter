import React from 'react'
import './index.scss'

type loaderProps = {
    show: boolean,
}

const LoadingSpinner = ({show}:loaderProps) => {
  return (
    <>
        
        {show && <div className='loadar_container'>
            <div className='loader'></div>
        </div>
        }
    </>
  )
}

export default LoadingSpinner