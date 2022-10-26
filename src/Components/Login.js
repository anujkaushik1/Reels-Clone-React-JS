import * as React from 'react';
import { useContext, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import './Login.css';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import insta from '../Assets/Instagram.jpg';
import { Link, useNavigate } from 'react-router-dom'
import bg from '../Assets/insta.png'
import 'pure-react-carousel/dist/react-carousel.es.css';
import img1 from '../Assets/img1.jpg';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import img4 from '../Assets/img4.jpg';
import img5 from '../Assets/img5.jpg';
import context from '../Context';


export default function Login() {
    const store = useContext(context);
    console.log(store);
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
        },
        text2: {
            textAlign: 'center'
        }


    })

    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login} = useContext(context);


    const signInUser = async() =>{

        try {
            setError('');

            let res = await login(email, password);
            console.log(res);
            navigate("/");

        } catch (error) {

            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 2000);
            
        }

    }

    return (

        <div className="loginWrapper">
            <div className="imgcar" style={{ backgroundImage: 'url(' + bg + ')', backgroundSize: 'cover' }}>
                <div className="car">
                    <CarouselProvider
                        visibleSlides={1}
                        totalSlides={5}
                        // step={3}
                        naturalSlideWidth={238}
                        naturalSlideHeight={423}
                        hasMasterSpinner
                        isPlaying={true}
                        infinite={true}
                        dragEnabled={false}
                        touchEnabled={false}
                    >
                        <Slider>
                            <Slide index={0}><Image src={img1}/></Slide>
                            <Slide index={1}><Image src={img2}/></Slide>
                            <Slide index={2}><Image src={img3}/></Slide>
                            <Slide index={3}><Image src={img4}/></Slide>
                            <Slide index={4}><Image src={img5}/></Slide>
                        </Slider>
                    </CarouselProvider>
                </div>
            </div>
            <div className="loginCard">
                <Card variant='outlined' className={classes.card1}>
                    <div className="insta-logo">
                        <img src={insta} alt="" />
                    </div>
                    <CardContent>
                        {
                            error != '' && <Alert severity="error">{error}</Alert>

                        }
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense' size='small' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' size='small' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <Typography color='primary' className={classes.text2} variant='subtitle1'>
                            Forget Password ?
                        </Typography>

                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" fullWidth={true} variant='contained' onClick={signInUser}>
                            Log in
                        </Button>
                    </CardActions>

                </Card>
                <Card variant='outlined' className={classes.card2}>
                    <Typography className={classes.text1} variant='subtitle1'>
                        Don't have an account ? <Link to='/signup' style={{ textDecoration: 'none' }}>Signup</Link>
                    </Typography>
                </Card>

            </div>
        </div>


    );
}
