import React, { useState } from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { v4 as uuidv4 } from "uuid";
import { database, storage } from './Firebase';
import { useNavigate } from 'react-router-dom';




function UploadFile(props) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const uploadPost = async (file) => {
    if (file === null) {
      setError('Please select a file');
      setTimeout(() => {
        setError('');
      }, 2000);

      return;
    }

    if (file.size / (1024 * 1024) > 100) {  // if file is greated than 100 mb
      setError('Video size is big');
      setTimeout(() => {
        setError('');
      }, 2000);

      return;
    }
    let uid = uuidv4();
    setLoading(true)
    sendFileToStorage(uid, file);
  }

  const sendFileToStorage = async (uid, file) => {
    const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
    uploadTask.on('state_changed', fn1, fn2, fn3);
    function fn1(snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress} done.`)
    }
    function fn2(error) {
      let msg = error.message;
      console.log('error', error)
      setError(msg);
      setLoading(false)
      setTimeout(() => {
        setError('');
      }, 2000);
    }
    async function fn3() {
      setError('');
      let url = await uploadTask.snapshot.ref.getDownloadURL();
      let obj = {
        likes: [],
        comments: [],
        pId: uid,
        pUrl: url,
        uName: props.user.fullname,
        uProfile: props.user.profileUrl,
        userId: props.user.userId,
        createdAt: database.getTimeStamp()
      }

      try {
        let ref = await database.posts.add(obj);
        let res = await database.users.doc(props.user.userId).update({
          postIds: props.user.postIds != null ? [...props.user.postIds, ref.id] : [ref.id]
        });

        console.log(res);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        setTimeout(() => {
          setError('');
        }, 2000);
      }



    }
  }

  return (
    <div>

      {
        error !== '' ? <Alert severity="error">{error}r</Alert> :
          <>
            <input type="file" accept='video/*' onChange={(e) => uploadPost(e.target.files[0])} id='upload-input' style={{ display: 'none' }} />
            <label htmlFor="upload-input">

              <Button variant='outlined' color='secondary' component='span' disabled={loading}>  {/* yeh button span ki prperties le ayya */}
                Upload Video
              </Button>
            </label>

            {
              loading && <LinearProgress color="secondary" style={{ marginTop: '3%' }} />
            }
          </>


      }
    </div>
  )
}

export default UploadFile