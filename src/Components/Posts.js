import React, { useEffect, useState } from 'react'
import { database } from './Firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import './Posts.css';
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';


function Posts({ userData }) {
    const [posts, setPosts] = useState(null);
    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };

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

            return unsub;

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
                                        <Like userData={userData} postData={post} />
                                        <ChatBubbleIcon className="chat-styling" onClick={() => handleClickOpen(post.pId)} />
                                        <Dialog
                                            open={open === post.pId}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            fullWidth={true}
                                            maxWidth='md'
                                        >
                                            <div className='modal-container'>
                                                <div className='video-modal'>
                                                    <Video src={post.pUrl} className='modal-video' />
                                                </div>
                                                <div className='comment-modal'>
                                                    <Card sx={{ maxWidth: 345 }}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                                component="img"
                                                                height="140"
                                                                image="/static/images/cards/contemplative-reptile.jpg"
                                                                alt="green iguana"
                                                            />
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h5" component="div">
                                                                    Lizard
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                                                    species, ranging across all continents except Antarctica
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Button size="small" color="primary">
                                                                Share
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                    <Card variant='outlined'>
                                                        <Typography>{post.likes.length === 0 ? '' : `Liked by ${post.likes.length} users`}</Typography>
                                                        <div style={{display: 'flex'}}>
                                                            <Like postData = {post} userData = {userData}/>
                                                        </div>
                                                    </Card>
                                                </div>
                                            </div>
                                        </Dialog>
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