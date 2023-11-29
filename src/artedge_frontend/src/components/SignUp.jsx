import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InterestsIcon from '@mui/icons-material/Interests';
import BadgeAvatars from './BadgeAvatars';
import {createActor, artedge_backend } from "../../../declarations/artedge_backend";
import { Principal } from "@dfinity/principal";

// TODO add authentication and the rest of profile data
// decide on avatar, refine the back-end, pre-populate Completed fields
// prevent ability to create multiple profiles for the same internet identity
// check the principal id during the create process or on login and only show the create form if they dont have

export default function SignUp(props) {
  let actor = artedge_backend;
  let principal = Principal.fromText(props.id);
  // console.log(props.id);
  // console.log(principal);

  const [profile, setProfile] = useState({
    userPrincipal: principal,
    // avatar: Blob;
    email: "",
    username: "",
    alias: "",
    genre: "",
    artState: "",
    interests: ""
});

function handleChange(event){
  const {name, value} = event.target;
  setProfile(prevProfile => {
      return {
          ...prevProfile, 
          [name]: value
      }

  })

}

const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  // console.log({
  //   email: data.get('email'),
  //   username: data.get('alias'),
  //   password: data.get('password'),
  // });
  setProfile({
    userPrincipal: principal,
    email: data.get('email'),
    username: data.get('firstName'),
    alias: data.get('alias'),
    genre: data.get('genre'),
    artState: data.get('artState'),
    interests: data.get('interests')
  })
  createMyProfile({
    userPrincipal: principal,
    email: data.get('email'),
    username: data.get('firstName'),
    alias: data.get('alias'),
    genre: data.get('genre'),
    artState: data.get('artState'),
    interests: data.get('interests')
  });
};

const handleShow = (event) => {
  event.preventDefault();
  // const {name, value} = event.target;
  // console.log("here now"+ {[name]:value} );
  displayMyProfile("0");
};

const handleDelete = (event) => {
  event.preventDefault();
  const {name, value} = event.target;
  console.log("here now"+ {[name]:value} );
  deletMyProfile("22");
};

async function createMyProfile(profile) {
  let profileId = await actor.createProfile(profile);
  console.log("this is my profile id: " + profileId);
  displayMyProfile(profileId);
}

async function displayMyProfile(stringId) {
  const profileDisplayed = await actor.readProfile(stringId);
  // const {0: {username},0: {email}, 0:{alias}} = await actor.readProfile(stringId);
  const {0: {username},0: {email}, 0:{alias}, 0:{artState}, 0:{interests}, 0:{userPrincipal}} = profileDisplayed;
  console.log({profileDisplayed})
  console.log(username)
  console.log(email + " " + alias + " " + artState + " " + interests)
  console.log(userPrincipal)
}  

async function updateMyProfile(stringId, profile) {
  //need to do this one
  let profileUpdated = await actor.updateProfile(stringId, profile);
}  

async function deletMyProfile(stringId) {
  const profileDeleted = await actor.deleteProfile(stringId);
}

return (
      <Container component="main" maxWidth="xs" sx={{backgroundColor: 'primary.light', borderRadius: 1.5, opacity: 0.7}}>
        <CssBaseline />
        <h1>{profile.username}</h1>
        <Button name="showbut" id="showbut" onClick={handleShow}>show profile</Button>
        <Button onClick={updateMyProfile}>update profile</Button>
        <Button onClick={handleDelete}>delete profile</Button>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <InterestsIcon />
            {/* <BadgeAvatars /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="alias"
                  name="alias"
                  required
                  fullWidth
                  id="alias"
                  label="alias AKA"
                  autoFocus
                  onChange={handleChange}
                  value={profile.alias}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="genre"
                  label="Genre of Art"
                  name="genre"
                  autoComplete="genre"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="interests"
                  label="Interests #Hastags"
                  name="interests"
                  autoComplete="interests"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="artState"
                  label="Artist Statement"
                  id="artState"
                  autoComplete="artState"
                  multiline
                  rows={4}
                  // defaultValue="Default Value"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive updates and insider info via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Profile
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}
