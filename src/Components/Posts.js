import React, { useEffect, useState } from 'react'
import { database } from './Firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import './Posts.css';



function Posts({ userData }) {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        let parr = [];
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnaphot) => {
            parr = [];
            querySnaphot.forEach((doc) => {
                let data = {
                    ...doc.data(),
                    postId: doc.id
                }

                parr.push(data);
            });

            setPosts(parr);
            
        })

    }, [])

    return (
        <div>

            {
                posts === null || userData === null ? <CircularProgress /> :

                    <div className='video-container'>
                            
                            {
                                posts.map((post, idx)=>(
                                    <React.Fragment key={idx}>
                                        <Video src = {post.pUrl}/>
                                    </React.Fragment>
                                ))
                            }

                    </div>

            }

        </div>
    )
}

export default Posts