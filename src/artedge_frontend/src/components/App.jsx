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
import Album from "./Album";                         
import { Principal } from "@dfinity/principal";
import Account from "./Account";
import ImageTest from "./ImageTest";
import PublicProfile from "./PublicProfile";
import Uploads from "./Uploads";
import SignInSide from "./SignInSide";

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

  let actor = artedge_backend;

  const [loggedin, setloggedin] = useState(false);
  const [userId, setUserId] = useState("2vxsx-fae");
  const [myactor, setMyactor] = useState({actor});
  const [hasProfile, setHasProfile] = useState(false);
  const [profId, setProfId] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [acoId, setAcoId] = useState();
  const [points, setPoints] = useState(100);

  // search
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
  //convert input text to lower case
  var lowerCase = e.target.value.toLowerCase();
  setInputText(lowerCase);
  };

  async function onLogIn(){
    // need to pass the has profile to Profile
    console.log("We are at onLogIn functions");
  };

  const handleRead = (event) => {
    event.preventDefault();
    const data = event.currentTarget;
    readPs();
  };
  
  const handleInc = (event) => {
    event.preventDefault();
    const data = event.currentTarget;
    addPs();
  };

  async function readPs(){
    document.getElementById("greeting").innerText = "";
    let points = await actor.read();
    console.log("creating the points actor" + points);
    setPoints(points);
    document.getElementById("greeting").innerText = points;
    // points = await C1.read();
    // console.log(points);
  };

  async function addPs(){
    let uppoints = await actor.inc();
    console.log("increment by 1" + uppoints);
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

    onLogIn();
    //should all of this be passed to onLogIn();
    const greeting = await actor.getCaller();
    setUserId(greeting); //logged in principal with async call to backend
    // console.log(greeting);
    let myP = Principal.fromText(greeting);
    let returnVisit = await actor.hasProfile(myP);
    setProfId(returnVisit);
    if (!returnVisit == "" || null){
      setHasProfile(true);
      // set the counter from the existing points
      let proidNat = (parseInt(returnVisit));
      let actualpoints = await actor.readPoints(proidNat);
      setPoints(actualpoints);
      console.log(actualpoints);
    };
    let returnAccount = await actor.hasAccount(myP);
    setAcoId(returnAccount);
    if (!returnAccount == ""){
      setHasAccount(true);
    };

    setloggedin(true);
    // const myactor = actor;
    setMyactor(actor);

    return false;
  };

  async function logMeOut(){
    setUserId("2vxsx-fae");
    setloggedin(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header login = {doLog} loginStatus = {loggedin} logout = {logMeOut} input={inputText} shandle={inputHandler}/>
        <Uploads id = {userId} registered={hasProfile} proid={profId}/>
        {/* <Route path="/"><SignInSide /></Route> */}
        <Route path="/Art"><Art input={inputText} readps={handleRead} adps={handleInc}/></Route>
        <Route path="/Support"><Support login = {doLog} status = {loggedin}/></Route>
        <Route path="/Master"><Master id = {userId} adps={handleInc} proid={profId} points={points}/></Route>
        <Route path="/PublicProfile"><PublicProfile id = {userId} registered={hasProfile} proid={profId}/></Route>
        <Route path="/ImageTest"><ImageTest id = {userId} registered={hasProfile} proid={profId}/></Route>
        <Route path="/Profile"><Profile id = {userId} registered={hasProfile} proid={profId} points={points}/></Route>
        <Route path="/Account"><Account id = {userId} regAco={hasAccount} acoid={acoId} points={points}/></Route>
        <Route path="/Gallery"><Album id = {userId}/></Route>
        <Route path="/Uploads"><Uploads id = {userId} registered={hasProfile} proid={profId}/></Route>
        <Footer />
    </ThemeProvider>
  );
}

export default App;
