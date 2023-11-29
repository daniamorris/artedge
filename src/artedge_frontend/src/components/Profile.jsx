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
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

// TODO add authentication and the rest of profile data
// decide on avatar, refine the back-end, pre-populate Completed fields
// prevent ability to create multiple profiles for the same internet identity
// check the principal id during the create process or on login and only show the create form if they dont have
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Profile(props) {

  let actor = artedge_backend;
  let principal = Principal.fromText(props.id);
  const cp = "Create";
  const up = "Update";

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
  const [profileId, setProfileId] = useState("");
  const [hasProfile, setHasProfile] = useState(false);

  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setProfile({
      userPrincipal: principal,
      email: data.get('email'),
      username: data.get('username'),
      alias: data.get('alias'),
      genre: data.get('genre'),
      artState: data.get('artState'),
      interests: data.get('interests')
    });
    createMyProfile({
      userPrincipal: principal,
      email: data.get('email'),
      username: data.get('username'),
      alias: data.get('alias'),
      genre: data.get('genre'),
      artState: data.get('artState'),
      interests: data.get('interests')
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setProfile({
      userPrincipal: principal,
      email: data.get('email'),
      username: data.get('username'),
      alias: data.get('alias'),
      genre: data.get('genre'),
      artState: data.get('artState'),
      interests: data.get('interests')
    })
    updateMyProfile(profileId, {
      userPrincipal: principal,
      email: data.get('email'),
      username: data.get('username'),
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
    displayMyProfile("0"); //stringId //profileId
  };

  const handleDelete = (event) => {
    event.preventDefault();
    deleteMyProfile(profileId);
  };

  async function createMyProfile(profile) {
    let profileId = await actor.createProfile(profile);
    setProfileId(profileId);
    setHasProfile(true);
    // console.log("this is my profile id: " + profileId);
    displayMyProfile(profileId);
  }

  async function updateMyProfile(stringId, profile) {
    let profileUpdated = await actor.updateProfile(stringId, profile);
  }  

  async function displayMyProfile(stringId) {
    const profileDisplayed = await actor.readProfile(stringId);
    const {0: {username},0: {email}, 0:{alias}, 0:{genre}, 0:{artState}, 0:{interests}, 0:{userPrincipal}} = profileDisplayed;
    document.getElementById("username").value = username;
    document.getElementById("email").value = email;
    document.getElementById("alias").value = alias;
    document.getElementById("genre").value = genre;
    document.getElementById("interests").value = interests;
    document.getElementById("artState").value = artState;
  }  

  async function deleteMyProfile(stringId) {
    const profileDeleted = await actor.deleteProfile(stringId);
    const alsoDeleted = await actor.deleteProPrinc(stringId);
    setProfile({
      userPrincipal: principal,
      email: "",
      username: "",
      alias: "",
      genre: "",
      artState: "",
      interests: ""
    });
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("alias").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("interests").value = "";
    document.getElementById("artState").value = "";
    setHasProfile(false);
  }

return (
      <Container component="main" maxWidth="xs" sx={{backgroundColor: 'primary.light', borderRadius: 1.5, opacity: 0.7, marginBottom: 4}}>
        <CssBaseline />
        <h1>{profile.username}</h1>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <InterestsIcon />
            <BadgeAvatars />
          </Avatar> */}
          <Typography component="h1" variant="h5" sx={{ mt: 3}}>
            {hasProfile ? up : cp} Profile
          </Typography>
          <Box component="form" noValidate onSubmit={hasProfile ? handleUpdate : handleCreate} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  id="username"
                  label="Username"
                  autoFocus
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  autoComplete="alias"
                  name="alias"
                  id="alias"
                  label="alias AKA"
                  autoFocus
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="genre"
                  label="Genre of Art"
                  name="genre"
                  autoComplete="genre"
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="interests"
                  label="Interests #Hastags"
                  name="interests"
                  autoComplete="interests"
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="artState"
                  label="Artist/Patron Statement"
                  id="artState"
                  autoComplete="artState"
                  multiline
                  rows={4}
                ></TextField>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {hasProfile ? up : cp} Profile
            </Button>
            {hasProfile && 
              <Stack spacing={1}>
                <Item>Danger Zone</Item>
                <Item><Button variant="contained" color="error" onClick={handleDelete}>delete profile</Button></Item>
              </Stack>
            }
          </Box>
        </Box>
      </Container>
  );
}
