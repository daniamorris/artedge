import * as React from 'react';
import { Link } from "wouter";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import { Link } from '@mui/material';
// import Avatar from '@mui/material/Avatar';
// import { red } from '@mui/material/colors';

export default function ImageDetail(props) {
  const mydollars = <MonetizationOnIcon color="secondary" />;
  const userlink = "/PublicProfile/" + props.id;
  console.log(props);

  function favoriteMe(e){
    const {id, name} = e.currentTarget;
    console.log("Favoriting " + id + name);
    // addFavorite(1); //need to create this
  }
  function shareMe(e){
    const {id, name} = e.currentTarget;
    console.log("Sharing " + id + name);
  }
    function tipMe(e){
    const {id, name} = e.currentTarget;
    console.log("Tipping " + id + name);
  }

  return (
    <Card sx={{ maxWidth: 500 }} id={props.id}>
      <CardMedia
        sx={{ height: 400 }}
        image={props.image}
        title={props.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {props.desc} 
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={userlink}>
          <Button size="small">Profile</Button>
        </Link>
        {/* <CopyToClipboard text="Hello!">
          <button>Copy to clipboard</button>
        </CopyToClipboard> */}
          {/* <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            A
          </Avatar> */}
        <IconButton id={userlink} name={props.title} onClick={favoriteMe} aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <CopyToClipboard text="Hello my share link!">
          <IconButton id={userlink} name={props.title} onClick={shareMe} aria-label="share">
            <ShareIcon />
          </IconButton>
        </CopyToClipboard>
        <IconButton id={userlink} name={props.title} onClick={tipMe} aria-label="share">
            {mydollars}
          </IconButton>
      </CardActions>
    </Card>
  );
}
