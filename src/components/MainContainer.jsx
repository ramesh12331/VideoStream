import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'

const MainContainer = () => {
  return (
    <div className='flex-1 mt-14 pt-4 px-4 w-[83%]'>
      <ButtonList/>
      <VideoContainer/>
    </div>
  )
}

export default MainContainer
