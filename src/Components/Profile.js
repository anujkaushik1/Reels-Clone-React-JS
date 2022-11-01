import { ParkRounded } from '@mui/icons-material';
import { CircularProgress, Typography } from '@mui/material';
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { database } from './Firebase';
import Navbar from './Navbar';
import './Profile.css';
import Avatar from '@mui/material/Avatar';
import './Video.css'
import Like from './Like';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Card from '@mui/material/Card';
import AddComment from './AddComment';
import Like2 from './Like2';
import Comments from './Comments';
import Video from './Video';
import Dialog from '@mui/material/Dialog';

function Profile() {

  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPost] = useState(null);
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {

    (async () => {

      database.users.doc(id).onSnapshot((snap) => {
        let data = snap.data();
        setUserData(data);
      })

    })();

  }, []);

  useEffect(() => {


    (async () => {
      if (userData !== null) {
        let parr = [];
        for (let i = 0; i < userData.postIds.length; i++) {

          let postid = userData.postIds[i];

          let postData = await database.posts.doc(postid).get();

          if (postData.data() !== undefined) {
            parr.push(postData.data());

          }
        }

        setPost(parr);

      }

    })();

  }, [userData]);

  return (
    <>
      {
        posts === null || userData === null ? <CircularProgress /> :
          <>
            <Navbar userData={userData} />
            <div className='spacer'>

            </div>
            <div className="container">
              <div className="upper-part">
                <div className="profile-img">
                  <img src={userData.profileUrl} alt="" />
                </div>
                <div className="info">
                  <Typography variant="h5">
                    gitEmail : {userData.email}
                  </Typography>
                  <Typography variant="h6">
                    Posts : {userData?.postIds?.length}
                  </Typography>
                </div>
              </div>
              <hr style={{ marginTop: '3rem', marginBottom: '3rem' }} />
              <div className='profile-video'>

                {
                  posts.map((post, idx) => (
                    <React.Fragment key={idx}>
                      <div className="videos">
                        <Video src={post.pUrl} />
                        <Dialog
                          open={open === post.pId}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                          fullWidth={true}
                          maxWidth='lg'
                        >

                          {
                            open !== null &&
                            <>
                              <div className='modal-container'>
                                <div className='video-modal'>
                                  <Video src={post.pUrl} />
                                </div>
                                <div className='comment-modal'>
                                  <Card className='card1'>
                                    <Comments key={idx} postData={post} />
                                  </Card>
                                  <Card variant='outlined' style={{ marginLeft: '4rem' }}>
                                    <Typography style={{ display: 'flex', justifyContent: 'center', padding: '0.4rem' }}>{post.likes.length === 0 ? '' : `Liked by ${post.likes.length} users`}</Typography>
                                    <div style={{ display: 'flex' }}>
                                      <Like2 postData={post} userData={userData} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                      <AddComment userData={userData} postData={post} />
                                    </div>
                                  </Card>
                                </div>
                              </div>

                            </>
                          }

                        </Dialog>
                      </div>

                    </React.Fragment>
                  ))
                }

              </div>

            </div>
          </>
      }
    </>
  )
}

export default Profile