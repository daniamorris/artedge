import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Privacy from './Privacy';
import Terms from './Terms';
import Contact from './Contact';

function Copyright() {
  return (
    <Typography color="text.secondary">
      {'Copyright © '}
      {/* <Link color="inherit" href="https://daniad.com/"> */}
        Artedge {' '}
      {/* </Link>{' '} */}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Contactbk() {
  return (
    <Typography color="text.secondary">
      <Button color="secondary" href="https://daniad.com/">Contact</Button>
    </Typography>
  );
}

export default function Footer() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // minHeight: '100vh',
        }}
      >
        <CssBaseline />
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: '#660f64',
          }}
        >
          <Container maxWidth="sm">
            <Stack direction="row" spacing={2}>
                <Privacy />
                <Terms />
                <Contact />
              </Stack>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </>
  );
}
