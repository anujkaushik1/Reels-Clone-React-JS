import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { makeStyles } from '@mui/material/styles';
import './Signup.css';
import insta from '../Assets/Instagram.jpg';

export default function Signup() {

  const useStyles = makeStyles({
    text1 : {
      color : 'grey',
      textAlign : 'center'
    }
  })

  const styles = useStyles();

  return (

    <div className="signupWrapper">
      <div className="signupCard">
        <Card variant='outlined'>
          <div className="insta-logo">
            <img src={insta} alt="" />
          </div>
          <CardContent>
              <Typography variant='subtitle1'>
                Sign up to see photos and videos from your friends
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>


  );
}
