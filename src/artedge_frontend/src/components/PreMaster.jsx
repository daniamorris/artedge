import * as React from 'react';
import { useAuth } from "./use-auth-client";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import PreTrainingModule from './PreTrainingModule';

export default function PreMaster(props) {
    const { login } = useAuth();
    const [expanded, setExpanded] = React.useState(false);
    let mystatus = props.loginStatus;

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
        <PreTrainingModule id = {props.id} proid={props.proid} points={props.points} mycounter={props.mycounter}/>
        <Typography variant="h5" display="block" gutterBottom>
      {!mystatus && <Button variant="contained" onClick={login}>Login to start</Button>}
      </Typography>
        <Box mt={6} />
    </Container>
  );
}