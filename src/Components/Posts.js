import React, { useEffect, useState } from 'react'
import { database } from './Firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import './Posts.css';
import Avatar from '@mui/material/Avatar';
import Like from './Like';




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
                            posts.map((post, idx) => (
                                <React.Fragment key={idx}>
                                    <div className="videos">
                                        <Video src={post.pUrl} />
                                        <div className="fa" style={{ display: 'flex' }}>
                                            <Avatar src={userData.profileUrl} />
                                            <h4>{userData.fullname}</h4>
                                        </div>
                                        <Like userData = {userData} postData = {post}/>
                                    </div>

                                </React.Fragment>
                            ))
                        }

                    </div>

            }

        </div>
    )
}

export default Posts