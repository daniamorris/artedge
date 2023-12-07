import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ImageFeed from './ImageFeed';
import { Button } from "@mui/material";

export default function Art({input, readps, adps}) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
      {/* <h1 id="greeting"></h1>
      <Button id={"1"} name={"points"} variant="contained" onClick={readps}>Read points</Button>
      <Button id={"1"} name={"points"} variant="contained" onClick={adps}>Add points</Button> */}
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <ImageFeed input={input}/>
        </Box>
        {/* <CustomImageList /> */}
      </Container>
    </React.Fragment>
  );
}

