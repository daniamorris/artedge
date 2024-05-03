import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ImageFeed from './ImageFeed';
import PreImageFeed from './PreImageFeed';
import DataFeed from './DataFeed';

export default function Art({input, addPoints, loginStatus}) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
      <Box sx={{ width: '100%', maxWidth: 500 }}>
      {loginStatus ? <ImageFeed input={input} addPoints={addPoints}/> : <PreImageFeed input={input}/>}
        {/* {loginStatus ? <DataFeed input={input} addPoints={addPoints}/> : <DataFeed input={input}/>} */}
        </Box>
        {/* <CustomImageList /> */}
        {/* <img src="http://127.0.0.1:4943/uploads/squares5.500.500.jpg?canisterId=b77ix-eeaaa-aaaaa-qaada-cai" /> */}
      </Container>
    </React.Fragment>
  );
}

