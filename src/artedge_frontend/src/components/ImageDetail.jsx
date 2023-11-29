import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
// import Avatar from '@mui/material/Avatar';
// import { red } from '@mui/material/colors';

export default function ImageDetail(props) {
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
        {props.title} and Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Support</Button> */}
        <Button size="small">Profile</Button>
          {/* <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            A
          </Avatar> */}
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
