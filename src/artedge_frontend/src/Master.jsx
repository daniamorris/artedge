import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';

export default function Master() {
  return (
    <Container maxWidth="sm">
        <Box mt={16} />
        <Card sx={{ maxWidth: 600 }}>
        <CardActionArea>
            <CardMedia
            component="img"
            height="200"
            image="logoMarklg.png"
            alt="green iguana"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                Training Coming Soon...
            </Typography>
            <Typography variant="body2" color="text.secondary">
            "To be a successful creator you don’t need millions. You don’t need millions of dollars or millions of customers, millions of clients or millions of fans. To make a living as a craftsperson, photographer, musician, designer, author, animator, app maker, entrepreneur, or inventor you need only thousands of true fans." - Kevin Kelley
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
        <Box mt={40} />
    </Container>
  );
}