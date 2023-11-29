import React, { useEffect, useState } from "react";
import { Link, Route } from "wouter";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from "./Header";
import Art from "./Art";
import Support from "./Support";
import Master from "./Master";
import Footer from "./Footer";
import Profile from "./Profile";
import {createActor, artedge_backend} from "../../../declarations/artedge_backend";
import {AuthClient} from "@dfinity/auth-client"
import {HttpAgent} from "@dfinity/agent";                           


const defaultTheme = createTheme({
  palette: {
    background: {
      default: '#40003f',
    },
    primary: {
      light: '#e1bee7',
      main: '#6a1b9a',
      dark: '#4a148c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#b2dfdb',
      main: '#9c27b0',
      dark: '#004d40',
      contrastText: '#000',
    },
    accent: {
      main: '#4a148c',
    },
  },
});

function App() {

  const [loggedin, setloggedin] = useState(false);
  const [userId, setUserId] = useState("2vxsx-fae");

  // search
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
  //convert input text to lower case
  var lowerCase = e.target.value.toLowerCase();
  setInputText(lowerCase);
  };

  let actor = artedge_backend;
  // let anonymous = Principal.fromText("2vxsx-fae");

  async function countPs(){
    // await actor.createCounter();
    console.log("creating the points actor");
    // poits = await C1.read();
    // console.log(poits);
  };

  async function doLog() {
    // create an auth client
    let authClient = await AuthClient.create();
    // start the login process and wait for it to finish
    await new Promise((resolve) => {
        authClient.login({
            identityProvider: process.env.II_URL,
            onSuccess: resolve,
        });
    });
    // At this point you're authenticated, and you can get the identity from the auth client:
    const identity = authClient.getIdentity();
    // Using the identity obtained from the auth client, you can create an agent to interact with the IC.
    const agent = new HttpAgent({identity});
    // Using the interface description of our webapp, you create an actor that you use to call the service methods.
    actor = createActor(process.env.ARTEDGE_BACKEND_CANISTER_ID, {
        agent,
    });

    setloggedin(true);

    return false;
  };

  async function logMeOut(){
    setUserId("2vxsx-fae");
    setloggedin(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header login = {doLog} loginStatus = {loggedin} logout = {logMeOut} input={inputText} shandle = {inputHandler}/>
        <Route path="/"><Art input={inputText} /></Route>
        <Route path="/Art"><Art input={inputText} /></Route>
        <Route path="/Support"><Support login = {doLog} status = {loggedin}/></Route>
        <Route path="/Master"><Master /></Route>
        <Route path="/Profile"><Profile id = {userId}/></Route>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
