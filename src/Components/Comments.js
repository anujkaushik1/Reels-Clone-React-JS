import React, { useEffect, useState } from 'react'
import { database } from './Firebase';
import CircularProgress from '@mui/material/CircularProgress';
import { Duo } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';

function Comments({ postData }) {
    const [comments, setComments] = useState(null);

    useEffect(() => {

        (async () => {
            let arr = [];
            let dbComments = postData.comments;

            for (let i = 0; i < dbComments.length; i++) {
                let allComments = dbComments[i];

                let comment = await database.comments.doc(allComments).get();
                arr.push(comment.data());
            }

            setComments(arr);

        })();

    }, [postData]);


    return (
        <div>
            {
                comments == null ? <CircularProgress /> :
                    <>
                        {
                            comments.map((comment, idx) => (
                                <div key={idx} style={{ display: 'flex' }}>
                                    <Avatar src={comment.uProfileImage} />
                                    <p>&nbsp;&nbsp;<span style={{ fontWeight: 'bold' }}>{comment.uName}</span>&nbsp;&nbsp; {comment.text}</p>
                                </div>
                            ))
                        }
                    </>
            }
        </div>
    )
}

// comments.length === 0 ? <CircularProgress /> :
//     <>
//         {
//            console.log("ANUuuuuuuuuuuuu")

//         }

//     </>


/*useEffect(() => {
        let dbComments = postData.comments;
        let arr = [];

        const getComments = async () => {
            dbComments.forEach(async (c) => {
                let data = await database.comments.doc(c).get();
                let comment = data.data();
                arr.push(comment);
            });
            
        }

        const setCommentState = async () => {
            setComments(arr);
        }

        (async () => {
            await getComments();
            await setCommentState();

        })();


        // let arr = [];
        // dbComments.forEach(async (comment)=>{
        //     let data = await database.comments.doc(comment).get();
        //     arr.push(data.data()); 
        // })

        // console.log(arr);

    }, [postData]) */

export default Comments