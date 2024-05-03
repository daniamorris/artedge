import React, { useEffect, useState } from "react";
import { useAuth, AuthProvider } from "./use-auth-client";
import {createActor, dip721_nft} from "../../../declarations/dip721_nft";
import { Principal } from "@dfinity/principal";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import StarRateIcon from '@mui/icons-material/StarRate';
import CircleLoading from "./CircleLoading";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.overline,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Nft(props) {
    const [result, setResult] = useState("");
    const { whoamiActor, logout, principal } = useAuth();
    let actor = dip721_nft;
    const [loading, Setloading] = useState(false);
    const [registered, setRegistered] = useState(false);
    const cp = "Create";
    const up = "Update";

    // https://github.com/dfinity/agent-js/blob/3502217ba8f81595ebd40f468046ba4df83d146c/packages/assets/README.md#L4
    // const input = document.createElement('input');
    // input.type = 'file';
    // input.addEventListener('change', async (e) => {
    //     const file = e.target.files[0];
    //     const key = await assetManager.store(file);
    // });
    // input.click();

  
    const handleClick = async () => {
        const whoami = await whoamiActor.whoami();
        setResult(whoami);
        console.log(whoami);
        console.log(principal);
      };
      
    const handleMint = async () => {
        const whoami = await whoamiActor.whoami();
        setResult(whoami);
        console.log(whoami);
        console.log(principal);
      };
 
    const getMax = async () => {
        const myMax = await actor.getMaxLimitDip721();
        setResult(myMax);
        console.log("getting the max");
        console.log(myMax);
      };

    const handleTransfer = async () => {
        const myMax = await actor.getMaxLimitDip721();
        setResult(myMax);
        console.log("getting the max");
        console.log(myMax);
      };

    let meprincipal = Principal.fromText("ca5oa-7rf2x-xzqab-v6t3b-uqjxk-otyig-i44g5-2chlx-36sa2-6n7f6-tae");

    const getBallance = async () => {
        // const myBallance = await actor.balanceOfDip721(principal);
        const myBallance = await actor.balanceOfDip721(meprincipal);
        setResult(myBallance);
        console.log("getting the ballance");
        console.log(myBallance);
      };
      
    return (
        <>
            <h1>This is an NFT interface</h1>
            <p>{result}</p>
            <Button variant="contained" onClick={handleClick}>create a new collection of NFT's</Button>
            <Button variant="contained" onClick={handleMint}>Mint an NFT's</Button>
            <Button variant="contained" onClick={getMax}>getMaxLimitDip721 collection of NFT's</Button>
            <Button variant="contained" onClick={handleTransfer}>Transferring an NFT's</Button>
            <Button variant="contained" onClick={getBallance}>balanceOfDip721 of NFT's</Button>
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
                    {registered ? up : cp} an NFT Collection
                </Typography>
                <Item id="mypoints"><StarRateIcon color="primary" sx={{ fontSize: 25, verticalAlign: '-8%'}}/>  this was points and loading</Item>
                {loading && <CircleLoading />}
                <Box component="form" noValidate onSubmit={handleClick} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="logo"
                        id="logo"
                        label="logo"
                        autoFocus
                        InputLabelProps={{
                            shrink: true,
                        }}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        fullWidth
                        name="name"
                        id="name"
                        label="name"
                        autoComplete="name"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth
                        autoComplete="symbol"
                        name="symbol"
                        id="symbol"
                        label="symbol"
                        autoFocus
                        InputLabelProps={{
                            shrink: true,
                        }}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth
                        id="maxLimit"
                        label="maxLimit"
                        name="maxLimit"
                        autoComplete="maxLimit"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        ></TextField>
                    </Grid>
                    {/* <Grid item xs={12}>
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
                    </Grid> */}
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    {registered ? up : cp} Collection
                    </Button>
                    {registered && 
                    <Stack spacing={1}>
                        <Item>Danger Zone</Item>
                        <Item><Button variant="contained" color="error" onClick={handleDelete}>delete profile</Button></Item>
                    </Stack>
                    }
                </Box>
                <Box sx={{ height: 10}}></Box>
                </Box>
            </Container>
        </>
    );
}