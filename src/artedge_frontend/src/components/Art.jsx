import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ImageFeed from './ImageFeed';

export default function Art(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <ImageFeed input={props.input}/>
        </Box>
        {/* <CustomImageList /> */}
      </Container>
    </React.Fragment>
  );
}

