import React, { useState } from "react";
import {artedge_backend} from "../../../declarations/artedge_backend";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

let actor = artedge_backend;

function hide() {
    var x = document.getElementById("hhide");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  } 

export default function SignInSide() {

  const [blist, setBlist] = useState({
      name: "",
      email: ""
  });

  const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const mynameis = "Thanks! " + data.get('name');
      document.getElementById("thankyou").innerText = mynameis;
      document.getElementById("more").innerText = "We will notify you when it's time.";
      hide();
      setBlist({
          name: data.get('name'),
          email: data.get('email')
      });
      subscribe({
          name: data.get('name'),
          email: data.get('email')
      });
  };

  async function subscribe(blist){
      let elistId = await actor.betaList(blist);
  };

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(signup.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ alignContent: 'center' }}>
              Join the Beta Waitlist!
            </Typography>
            <Box id="hhide" component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="First Name"
                id="name"
                autoComplete="name"
              />
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
            <h1 id="thankyou"></h1>
            <Typography id="more" color="text.secondary">
            </Typography>
          </Box>
        </Grid>
      </Grid>
  );
}