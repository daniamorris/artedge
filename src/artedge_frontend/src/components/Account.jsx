import React, { useState } from "react";
import {artedge_backend } from "../../../declarations/artedge_backend";
import { renderToString } from 'react-dom/server';
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Account(props) {

  let actor = artedge_backend;
  let principal = Principal.fromText(props.id);
  let points = props.points;
  let stgpoints = renderToString(points);

  const cp = "Create";
  const up = "Update";
  const [account, setAccount] = useState({
    userPrincipal: principal,
    contact: "",
    commissions: "",
    payments: "",
    points: points
});
  const [accountId, setAccountId] = useState(props.acoid);
  const [hasAccount, setHasAccount] = useState(props.regAco);

  if (!accountId ==""){
    displayMyAccount(accountId);
  }

  function hide() {
    var x = document.getElementById("hhide");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  } 

  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setAccount({
      userPrincipal: principal,
      contact: data.get('contact'),
      commissions: data.get('commissions'),
      payments: data.get('payments'),
      points: points
    });
    createMyAccount({
      userPrincipal: principal,
      contact: data.get('contact'),
      commissions: data.get('commissions'),
      payments: data.get('payments'),
      points: stgpoints
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setAccount({
      userPrincipal: principal,
      contact: data.get('contact'),
      commissions: data.get('commissions'),
      payments: data.get('payments'),
      points: points
    })
    updateMyAccount(accountId, {
      userPrincipal: principal,
      contact: data.get('contact'),
      commissions: data.get('commissions'),
      payments: data.get('payments'),
      points: stgpoints
    });
  };

  const handleShow = (event) => {
    event.preventDefault();
    displayMyAccount(accountId);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    deleteMyAccount(accountId);
  };

  async function createMyAccount(account) {
    let accountId = await actor.createAccount(account);
    setAccountId(accountId);
    setHasAccount(true);
    displayMyAccount(accountId);
  }

  async function updateMyAccount(stringId, account) {
    document.getElementById("hhide").innerText = "update in progress";
    let accountUpdated = await actor.updateAccount(stringId, account);
    displayMyAccount(stringId);
    hide();
  }  

  async function displayMyAccount(stringId) {
    const accountDisplayed = await actor.readAccount(stringId);
    const {0: {contact},0: {commissions}, 0:{payments}} = accountDisplayed;
    document.getElementById("contact").value = contact;
    document.getElementById("commissions").value = commissions;
    document.getElementById("payments").value = payments;
    // document.getElementById("points").value = points;
    setHasAccount(true);
  }  

  async function deleteMyAccount(stringId) {
    const accountDeleted = await actor.deleteAccount(stringId);
    const alsoDeleted = await actor.deleteAcoPrinc(stringId);
    setAccount({
        userPrincipal: principal,
        contact: "",
        commissions: "",
        payments: "",
        points: points
    });
    document.getElementById("contact").value = "";
    document.getElementById("commissions").value = "";
    document.getElementById("payments").value = "";
    setHasAccount(false);
  }

  async function checkMyAccount(){
    let returnVisit = await actor.hasAccount(principal);
    console.log(returnVisit);
    console.log(props.regAco + props.acoid); //this works lift up state
    if (!returnVisit == ""){
      console.log("this is a return visitor show account" + returnVisit);
      displayMyAccount(returnVisit)
    }
    // if return user render account don't add another 
  }

  function returnUser(accountId){
    console.log("return user");
    displayMyAccount(accountId);
  }

return (
      <Container component="main" maxWidth="xs" sx={{backgroundColor: 'primary.light', borderRadius: 1.5, opacity: 0.7, marginBottom: 4}}>
        <CssBaseline />
        {/* <h1>{account.contact}</h1>
        <Button onClick={checkMyAccount}>return visit?</Button> */}
        {/* <Button onClick={handleShow}>show account</Button> */}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mt: 3}}>
            {hasAccount ? up : cp} Account
          </Typography>
          <div id="hhide"></div>
          <Box component="form" noValidate onSubmit={hasAccount ? handleUpdate : handleCreate} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="contact"
                  id="contact"
                  label="preferred method of contact"
                  autoFocus
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="commissions"
                  id="commissions"
                  label="Commissions accepted and price range"
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="payments"
                  id="payments"
                  label="Accepted forms of payment"
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </Grid>              
              {/* <Grid item xs={12}>
                <TextField
                  fullWidth
                  hidden={true}
                  name="points"
                  id="points"
                  label="points total"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                ></TextField>
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {hasAccount ? up : cp} Account
            </Button>
            {hasAccount && 
              <Stack spacing={1}>
                <Item>Danger Zone</Item>
                <Item><Button variant="contained" color="error" onClick={handleDelete}>delete account</Button></Item>
              </Stack>
            }
          </Box>
          <Box sx={{ height: 10}}></Box>
        </Box>
      </Container>
  );
}
