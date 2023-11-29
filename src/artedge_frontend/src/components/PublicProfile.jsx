import React, { useEffect, useState } from "react";
import {createActor, artedge_backend } from "../../../declarations/artedge_backend";
import { Principal } from "@dfinity/principal";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';


const featuredPosts = [
  {
    title: 'Featured or favorite image',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'Featured or favorite gallery',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
];

export default function PublicProfile(props) {
  let actor = artedge_backend;

  const [mainFeaturedPost, setmainFeaturedPost] = useState({
    title: 'My Username is',
    description:
      "Multiple lines from my statement - that form the ledge, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random?wallpapers',
    imageText: 'main image description',
    linkText: 'Continue reading…',
});

const handleShow = (event) => {
  event.preventDefault();
  // const {name, value} = event.target;
  // console.log("here now"+ {[name]:value} );
  displayMyProfile("0");
};

  async function displayMyProfile(stringId) {
    const profileDisplayed = await actor.readProfile(stringId);
    // const {0: {username},0: {email}, 0:{alias}} = await actor.readProfile(stringId);
    const {0: {username},0: {email}, 0:{alias}, 0:{artState}, 0:{interests}, 0:{userPrincipal}} = profileDisplayed;
    // console.log({profileDisplayed})
    // console.log(username)
    // console.log(email + " " + alias + " " + artState + " " + interests)
    // console.log(userPrincipal)
    setmainFeaturedPost( {
      title: username,
      description: artState,
      image: 'https://source.unsplash.com/random?wallpapers',
      imageText: 'main image description',
      linkText: 'Continue reading…',
    });

  }  
  
  return (
      <Container maxWidth="lg">
        <Button name="showbut" id="showbut" onClick={handleShow}>show profile</Button>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
          </Grid>
        </main>
      </Container>
  );
}