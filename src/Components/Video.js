import React from 'react'
import './Video.css'
import ReactDOM from 'react-dom'
import ReactPlayer from 'react-player/file';

function Video(props) {

 

   const clickMuteUnmute = (e) => {
      console.log('clicked');
      e.preventDefault();
      e.target.muted = !e.target.muted
   }


   // const autoNextVideo = (e) => {
   //    console.log('ended');
   //    let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling
   //    if (next) {
   //       next.scrollIntoView()
   //       e.target.muted = true
   //    }

   //    console.log(e);
   // }

   const ended = (e)=>{
      console.log(e);
   }


   return (
      //   <video src={props.src} className = 'videos-styling' muted = "muted" onClick={clickMuteUnmute} onEnded = {autoNextVideo} controls>

      //   </video>
      // <ReactPlayer clas playing= 'true' width='100%' height='80vh' controls url={props.src} />
      <ReactPlayer
         className='react-player' url={props.src} controls width={'100%'} height = {'80vh'}
         onEnded={(e)=>ended(e)}      
      />
   )
}

export default Video