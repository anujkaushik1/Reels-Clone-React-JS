import React, { useEffect } from 'react'
import vid1 from '../videos/vid1.mp4';
import vid2 from '../videos/vid2.mp4';
import vid3 from '../videos/vid3.mp4';

function Ioa() {

    const callback = (enteries) => {
        enteries.forEach((entry)=>{   // entry ke andr purra div hai videos vala

            let ele = entry.target.childNodes[0];
            console.log(ele);

            ele.play().then(()=>{
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause()
                }
            })

        })
    }

    let observer = new IntersectionObserver(callback, { threshold: 0.6 });  // 60% visible toh woh intersect kr rha hai

    useEffect(() => {
        const elements = document.querySelectorAll('.videos');
        elements.forEach((element)=>{
            observer.observe(element)  // attach krna
        })
    }, [])

    return (
        <div className='video-containers'>
            <div className='videos'>
                <video muted = 'muted' src={vid1} style={{ height: '85vh' }} />

            </div>
            <div className='videos'>
                <video  muted = 'muted' src={vid2} style={{ height: '85vh' }} />

            </div>
            <div className='videos'>
                <video  muted = 'muted'git ad d src={vid3} style={{ height: '85vh' }} />

            </div>
        </div>
    )
}

export default Ioa