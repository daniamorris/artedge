import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function GalleryCard(props) {
    const mykey = props.keyid;
    const { galpost } = props;
    const {[mykey]:{key}} = galpost;
    const {[mykey]:{title}, [mykey]: {desc}, [mykey]:{img}, [mykey]:{pid}} = galpost; 
    console.log(galpost); 
    console.log(title); 
    console.log(pid); 
    console.log(mykey); 
    console.log(key); 
  return (
    <Card
    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
  >
    <CardMedia
      component="div"
      sx={{
        // 16:9
        pt: '56.25%',
      }}
      // image="https://source.unsplash.com/random?wallpapers"
      image={img}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h5" component="h2">
        {title}
      </Typography>
      <Typography color="text.primary">
      {desc}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">View</Button>
      <Button size="small">Edit</Button>
    </CardActions>
    </Card>
  );
}
