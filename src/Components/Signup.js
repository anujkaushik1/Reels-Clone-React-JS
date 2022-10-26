import * as React from 'react';
import { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import './Signup.css';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import insta from '../Assets/Instagram.jpg';
import { Link, useNavigate } from 'react-router-dom'
import context from '../Context';
import { database, storage } from './Firebase';



export default function Signup() {

  const useStyles = makeStyles({
    text1: {
      color: 'grey',
      textAlign: 'center'
    },
    // card1 : {              // yeh bhi kr skte hai
    //   width : '30vw'
    // },
    card2: {
      height: '5vh',
      marginTop: '2%'
    }
  })

  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const { signup } = useContext(context);
  const navigate  = useNavigate();

  const signUpUser = async () => {
    if (file === null) {
      setError("Please upload profile image first");
      setTimeout(() => {
        setError('');
      }, 2000)

      return;
    }

    try {
      let userObj = await signup(email, password);
      let uid = userObj.user.uid;

      sendFileToStorage(uid);

    } catch (error) {
      let msg = error.message;
      console.log(msg);
      setError(msg);
      setTimeout(() => {
        setError('');
      }, 2000);

      return;
    }

  }

  const sendFileToStorage = async (uid) => {
    const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
    uploadTask.on('state_changed', fn1, fn2, fn3);
    function fn1(snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress} done.`)
    }
    function fn2(error) {
      let msg = error.message;
      console.log('error', error)
      setError(msg);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
    async function fn3() {
      setError('');
      let url = await uploadTask.snapshot.ref.getDownloadURL();
      database.users.doc(uid).set({
        email : email,
        userId : uid,
        fullname : name,
        profileUrl : url,
        createdAt : database.getTimeStamp()
      });

      navigate("/");
    }
  }

  return (

    <div className="signupWrapper">
      <div className="signupCard">
        <Card variant='outlined' className={classes.card1}>
          <div className="insta-logo">
            <img src={insta} alt="" />
          </div>
          <CardContent>
            <Typography className={classes.text1} variant='subtitle1'>
              Sign up to see photos and videos from your friends
            </Typography>
            {
              error != '' && <Alert severity="error">{error}</Alert>

            }
            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense' size='small' value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' size='small' value={password} onChange={(e) => setPassword(e.target.value)} />
            <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin='dense' size='small' value={name} onChange={(e) => setName(e.target.value)} />
            <Button size="small" color="secondary" fullWidth={true} variant='outlined' margin='dense' component='label'>
              Upload Profile Image
              <input type="file" accept='image/*' hidden onChange={(e) => setFile(e.target.files[0])} />
            </Button>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" fullWidth={true} variant='contained' onClick={signUpUser}>
              Sign up
            </Button>
          </CardActions>
          <CardContent>
            <Typography className={classes.text1} variant='subtitle1'>
              By signing up, you agree to our Terms, Conditions and Cokkies policy.
            </Typography>
          </CardContent>
        </Card>
        <Card variant='outlined' className={classes.card2}>
          <Typography className={classes.text1} variant='subtitle1'>
            Having an account ? <Link to='/login' style={{ textDecoration: 'none' }}>Login</Link>
          </Typography>
        </Card>

      </div>
    </div>


  );
}
