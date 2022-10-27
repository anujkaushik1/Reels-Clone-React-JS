import React from 'react'
import './Video.css'
function Video(props) {

  return (
        <video src={props.src} className = 'videos-styling' muted = "muted" onClick={(e)=>clickMuteUnmute(e)}>

        </video>
  )
}

export default Video