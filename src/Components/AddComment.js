import React from 'react'
import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { database } from './Firebase';

function AddComment({userData, postData}) {
    const [text, setText] = useState('');

    const postComment = async ()=>{
        let obj = {
            text : text,
            uProfileImage : userData.profileUrl,
            uname : userData.fullname
        }

        console.log(postData);

       const doc = await database.comments.add(obj);
        database.posts.doc(postData.postId).update({
            comments : [...postData.comments, doc.id]
       })

       setText('');
    }

    return (
        <div style={{width : '100%'}}>
            <TextField id="filled-basic" label="Comment" variant="outlined" size='small' sx={{width : '75%'}} value={text} onChange={(e) => setText(e.target.value)} />
            <Button variant="contained" onClick={postComment}>Post</Button>

        </div>
    )
}

export default AddComment