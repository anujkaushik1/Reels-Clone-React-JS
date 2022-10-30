import React from 'react'
import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AddComment() {
    const [text, setText] = useState('');
    return (
        <div style={{width : '100%'}}>
            <TextField id="filled-basic" label="Comment" variant="outlined" size='small' sx={{width : '75%'}} value={text} onChange={(e) => setText(e.target.value)} />
            <Button variant="contained">Post</Button>

        </div>
    )
}

export default AddComment