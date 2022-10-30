import React from 'react'
import { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from './Firebase';

function Like2({ userData, postData }) {
    const [like, setLike] = useState(null);

    useEffect(() => {

        let check = postData.likes.includes(userData.userId) ? true : false;
        setLike(check);

    }, [postData]);  // jaise hi kuch like ya dislike hoga toh useEffect vapis chlega

    const clickLike = () =>{    
        console.log(like);
        if(like === true){
            let narr = postData.likes.filter((ele)=>ele !== userData.userId);
            console.log(narr);
            database.posts.doc(postData.postId).update({
                likes : narr
            });

        }
        else{
            let narr = [...postData.likes, userData.userId];
            console.log(narr);
            database.posts.doc(postData.postId).update({
                likes : narr
            })
        }
    }


    return (
        <div>
            {
                like !== null ?
                    <>
                        {
                            like === true ? <FavoriteIcon className='like' onClick = {clickLike}/>
                            :
                            <FavoriteIcon className='unlike'onClick = {clickLike}/>
                        }
                    </> :
                    <>

                    </>
        }
        </div>
    )
}

export default Like2