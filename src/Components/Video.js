import React, { useEffect } from 'react'
import './Video.css'
import ReactDOM from 'react-dom'
import ReactPlayer from 'react-player/file';


function Video(props) {

   const callback = (enteries) => {
      enteries.forEach((entry) => {   // entry ke andr purra div hai videos vala

         let ele = entry.target.childNodes[0];
         console.log(ele);

         ele.play().then(() => {
            if (!ele.paused && !entry.isIntersecting) {
               ele.pause()
            }
         })

      })
   }

   let observer = new IntersectionObserver(callback, { threshold: 0.6 });  // 60% visible toh woh intersect kr rha hai

   useEffect(() => {
      const elements = document.querySelectorAll('.react-player');
      elements.forEach((element) => {
         observer.observe(element)  // attach krna     })
      })


      return () => {
         observer.disconnect();
      }

   }, [props.src])


   return (
      <ReactPlayer
         className='react-player' muted={true} url={props.src} controls width={'100%'} height={'80vh'}
      />
   )
}

export default Video