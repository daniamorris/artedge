import React, { useState } from "react";
import {artedge_backend } from "../../../declarations/artedge_backend";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Principal } from "@dfinity/principal";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import StarRateIcon from '@mui/icons-material/StarRate';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Profile(props) {
  // let points = props.points;
  let actor = artedge_backend;
  let principal = Principal.fromText(props.id);
  const cp = "Create";
  const up = "Update";
  const [profile, setProfile] = useState({
    userPrincipal: principal,
    email: "",
    username: "",
    alias: "",
    genre: "",
    artState: "",
    interests: ""
});
  const [profileId, setProfileId] = useState(props.proid);
  const [hasProfile, setHasProfile] = useState(props.registered);
  const [currentPoints, setCurrentPoints] = useState(props.points);
  const showpoints = " You have " + currentPoints + " points!";


  if (!profileId ==""){
    displayMyProfile(profileId);
  }

  if (currentPoints){
    displayMyProfile(profileId);
  }

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
  }

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
  }

  const handleShow = (event) => {
    event.preventDefault();
    displayMyProfile(profileId);
  }

  const handleDelete = (event) => {
    event.preventDefault();
    deleteMyProfile(profileId);
  }

  function hide() {
    var x = document.getElementById("hhide");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  } 

  async function createMyProfile(profile) {
    let profileId = await actor.createProfile(profile);
    setProfileId(profileId);
    setHasProfile(true);
    displayMyProfile(profileId);
  }

  async function updateMyProfile(stringId, profile) {
    document.getElementById("hhide").innerText = "update in progress";
    let profileUpdated = await actor.updateProfile(stringId, profile);
    let nowPoints = await actor.readPoints(parseInt(stringId));
    setCurrentPoints(nowPoints);
    displayMyProfile(profileId);
    hide();
  }  

  async function displayMyProfile(stringId) {
    const profileDisplayed = await actor.readProfile(stringId);
    let nowPoints = await actor.readPoints(parseInt(stringId));
    setCurrentPoints(nowPoints);
    const {0: {username},0: {email}, 0:{alias}, 0:{genre}, 0:{artState}, 0:{interests}, 0:{userPrincipal}} = profileDisplayed;
    document.getElementById("username").value = username;
    document.getElementById("email").value = email;
    document.getElementById("alias").value = alias;
    document.getElementById("genre").value = genre;
    document.getElementById("interests").value = interests;
    document.getElementById("artState").value = artState;
    setHasProfile(true);
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
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mt: 3}}>
            {hasProfile ? up : cp} Profile
          </Typography>
          <div id="hhide"></div>
          <Item id="mypoints"><StarRateIcon color="primary" />  {currentPoints && showpoints}</Item>
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="genre"
                  label="Genre of Art"
                  name="genre"
                  autoComplete="genre"
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="interests"
                  label="Interests #Hastags"
                  name="interests"
                  autoComplete="interests"
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
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
          <Box sx={{ height: 10}}></Box>
        </Box>
      </Container>
  );
}
