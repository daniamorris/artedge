import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import TrainingModule from './TrainingModule';

export default function Master(props) {

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container maxWidth="sm">
        <Box mt={6} />
        <Card sx={{ maxWidth: 600 }}>
        {/* <CardActionArea onClick={handleExpandClick}> */}
            <CardMedia
            component="img"
            height="200"
            image="logoMarklg.png"
            alt="green iguana"
            />
            {/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                1000 True Fans
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
                Making a living doing what you Love
            </Typography>
            <Typography variant="body2" color="text.secondary">
            "To be a successful creator you don’t need millions. You don’t need millions of dollars or millions of customers, millions of clients or millions of fans. To make a living as a craftsperson, photographer, musician, designer, author, animator, app maker, entrepreneur, or inventor you need only thousands of true fans." - Kevin Kelley
            </Typography>
            </CardContent>
            {/* </Collapse> */}
        {/* </CardActionArea> */}
        </Card>
        <TrainingModule id = {props.id} proid={props.proid} points={props.points} mycounter={props.mycounter}/>
        <Box mt={6} />
    </Container>
  );
}