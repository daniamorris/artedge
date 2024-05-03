import React, { useEffect, useState } from "react";
import { useAuth, AuthProvider } from "./use-auth-client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, Route, useParams } from "wouter";
import Header2 from "./Header2.jsx";
import Footer from "./Footer";
import Art from "./Art";
import Support from "./Support";
import Album from "./Album";
import Master from "./Master";
import PublicProfile from "./PublicProfile";
import Profile from "./Profile";
import PreHeader from "./PreHeader"
import PreSupport from "./PreSupport"
import SignInSide from "./SignInSide";
import PreMaster from "./PreMaster";
import Account from "./Account";
import Uploads from "./Uploads";
import EditImageDetail from "./EditImageDetail";


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
  const { isAuthenticated, identity, principal, whoamiActor } = useAuth();
  let actor = whoamiActor;
  const [hasProfile, setHasProfile] = useState(false);
  const [profileId, setProfileId] = useState();
  const [points, setPoints] = useState(100);
  const [hasAccount, setHasAccount] = useState(true);
  const [acoId, setAcoId] = useState();

  // search
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
  //convert input text to lower case
  var lowerCase = e.target.value.toLowerCase();
  setInputText(lowerCase);
  };

  function nopro(){
    setHasProfile(false);
    // setProfileId();
  }

  function yespro(){
    setHasProfile(true);
  }

  function setpro(profileId){
    setProfileId(profileId);
  }

  function noacc(){
    setHasAccount(false);
    // setProfileId();
  }

  function yesacc(){
    setHasAccount(true);
  }

  function setacc(acoId){
    setAcoId(acoId);
  }

  async function addPoints(adding){
    if (hasProfile) {
        //  setPlus(adding);
    // console.log("adding this many points: " + adding);
    let newtotal = (parseInt(points)) + adding;
    // console.log("updating total points now to: " + newtotal);
    let proidNat = (parseInt(profileId));
    let mypoints = await actor.addPoints(proidNat, newtotal);
    getMyPoints(proidNat); 
    } else {
      console.log("no points yet");
      let newtotal = (parseInt(points)) + adding;
    }    
  }

  async function getMyProfileId(){
    let getProfileId = await actor.hasProfile(principal);
    if (!getProfileId == "" | null){
      console.log("has a profile initializing points counter");
      setProfileId(getProfileId);
      console.log("profile id is: " + profileId + " also " + getProfileId);
      setHasProfile(true);
      getMyPoints(parseInt(getProfileId));
    } else {
      console.log("this is the first time logging in create the profile");
      //this is the first time logging in create the profile
      let profile = {
        userPrincipal: principal,
        email: "",
        username: "",
        alias: "",
        genre: "",
        artState: "",
        interests: ""
      };
      let newProfileId = await actor.createProfile(profile);
      setProfileId(newProfileId);
      setHasProfile(true);
      // getMyPoints(parseInt(newProfileId));
    }
  }

  async function getMyPoints (profileId){
    let mypoints = await actor.readPoints(profileId);
    setPoints(mypoints);
  };


  if (isAuthenticated){
    // console.log("we are authenticated now check for a profile");
    getMyProfileId(principal);
  };

  return (
    <>      
      <header>
      {isAuthenticated ? <Header2 loginStatus = {isAuthenticated} input={inputText} shandle={inputHandler}/> : <PreHeader input={inputText} shandle={inputHandler}/>}
      </header>
      <main>
        <Route path="/" component={SignInSide} />
        <Route path="/PublicProfile/:id">
          {params => <PublicProfile id={params.id} />}
        </Route>
        <Route path="/EditImageDetail/:id">
          {params => <EditImageDetail id={params.id} />}
        </Route>
        <Route path="/Art"><Art input={inputText} addPoints={addPoints} loginStatus = {isAuthenticated}/></Route>
        <Route path="/Support">{isAuthenticated ? <Support loginStatus = {isAuthenticated}/> : <PreSupport loginStatus = {isAuthenticated}/>}</Route>
        <Route path="/Master">{isAuthenticated ? <Master addPoints={addPoints} points={points}/> : <PreMaster loginStatus = {isAuthenticated}/>}</Route>
        <Route path="/PublicProfile"><PublicProfile id = {principal} registered={hasProfile} proid={profileId}/></Route>
        <Route path="/Profile"><Profile registered={hasProfile} proid={profileId} points={points} nopro={nopro} yespro={yespro} setpro={setpro}/></Route>
        <Route path="/Account"><Account regAco={hasAccount} acoid={profileId} noacc={noacc} yesacc={yesacc} setacc={setacc}/></Route>
        <Route path="/Gallery"><Album id = {principal}/></Route>
        <Route path="/Uploads"><Uploads proid={profileId}/></Route>
      </main>
      <Footer />
    </>
  );
}

export default () => (
  <AuthProvider>
    <ThemeProvider theme={defaultTheme}>
        <App />
    </ThemeProvider>
  </AuthProvider>
);
