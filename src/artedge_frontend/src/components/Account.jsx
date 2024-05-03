import React, { useState } from "react";
import { useAuth, AuthProvider } from "./use-auth-client";
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
import CircleLoading from "./CircleLoading";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Account({regAco, acoid, noacc, yesacc, setacc}) {
  const { principal, whoamiActor } = useAuth();
  let actor = whoamiActor;

  const cp = "Create";
  const up = "Update";
  const [loading, Setloading] = useState(false);
  const [account, setAccount] = useState({
    userPrincipal: principal,
    contact: "",
    commissions: "",
    payments: ""
});

  if (!acoid == "" | null){
    displayMyAccount(acoid);
  } else {
    console.log("we deleted the account");
  }

  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setAccount({
      userPrincipal: principal,
      contact: data.get('contact'),
      commissions: data.get('commissions'),
      payments: data.get('payments')
    });
    createMyAccount({
      userPrincipal: principal,
      contact: data.get('contact'),
      commissions: data.get('commissions'),
      payments: data.get('payments')
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setAccount({
      userPrincipal: principal,
      contact: data.get('contact'),
      commissions: data.get('commissions'),
      payments: data.get('payments')
    })
    updateMyAccount(acoid, {
      userPrincipal: principal,
      contact: data.get('contact'),
      commissions: data.get('commissions'),
      payments: data.get('payments')
    });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    deleteMyAccount(acoid);
  };

  async function createMyAccount(account) {
    let accountId = await actor.createAccount(account);
    setacc(accountId);
    yesacc();
    displayMyAccount(accountId);
  }

  async function updateMyAccount(stringId, account) {
    Setloading(true);
    let accountUpdated = await actor.updateAccount(stringId, account);
    displayMyAccount(acoid);
    Setloading(false);
  }  

  async function displayMyAccount(stringId) {
    const accountDisplayed = await actor.readAccount(stringId);
    const {0: {contact},0: {commissions}, 0:{payments}} = accountDisplayed;
    document.getElementById("contact").value = contact;
    document.getElementById("commissions").value = commissions;
    document.getElementById("payments").value = payments;
  }  

  async function deleteMyAccount(stringId) {
    Setloading(true);
    const accountDeleted = await actor.deleteAccount(stringId);
    const alsoDeleted = await actor.deleteAcoPrinc(stringId);
    setAccount({
        userPrincipal: principal,
        contact: "",
        commissions: "",
        payments: ""
    });
    document.getElementById("contact").value = "";
    document.getElementById("commissions").value = "";
    document.getElementById("payments").value = "";
    noacc();
    Setloading(false);
    setacc(null);
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
            {regAco ? up : cp} Account
          </Typography>
          {loading && <CircleLoading />}
          <Box component="form" noValidate onSubmit={regAco ? handleUpdate : handleCreate} sx={{ mt: 3 }}>
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {regAco ? up : cp} Account
            </Button>
            {/* {regAco && 
              <Stack spacing={1}>
                <Item>Danger Zone</Item>
                <Item><Button variant="contained" color="error" onClick={handleDelete}>delete account</Button></Item>
              </Stack>
            } */}
          </Box>
          <Box sx={{ height: 10}}></Box>
        </Box>
      </Container>
  );
}
