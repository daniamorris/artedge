import React from "react";
import { useAuth } from "./use-auth-client";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function PreSupport(props) {
  const { login } = useAuth();
  let mystatus = props.loginStatus;
    return (
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
      <Box sx={{ height: 20, }}></Box>
      <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Typography gutterBottom>
        <h1>Do you like Art? </h1>
      </Typography>
      <Typography gutterBottom>
      <h2><i>Do you enjoy supporting others?</i></h2>
      </Typography>
      <Typography variant="h5" gutterBottom>
      Art Edge showcases art and supports creators via exposure and education. The following is a list of ways you can support others through this dapp:
      </Typography>
      <Typography gutterBottom>
        <ul>
          <li>Viewing and starring art, favoriting profiles. </li>
          <li>Requesting a commission</li>
          <li>Buying a print or an NFT</li>
          <li>Sending a tip</li>
          <li>Sharing artist's work on social media</li>
          <li>Hosting a gallery for your favorite artist</li>
          <li>Curating a gallery of your favorite art</li>
          <li>Participating in the governance of this DAO and tokenomics: https://internetcomputer.org/docs/current/tokenomics/</li>
        </ul>
      </Typography>
      <Typography gutterBottom>
      For each action you take in this environment you will be rewarded with points that translate into future tokens. For each action you take here, you'll be supporting a free and open web along with artists all over the world.
      </Typography>
      <Typography variant="h5" display="block" gutterBottom>
      {!mystatus && <Button variant="contained" onClick={login}>Login to start</Button>}
      </Typography>
      </Box>
    </Container>
    </React.Fragment>
    );
  }
export default PreSupport;