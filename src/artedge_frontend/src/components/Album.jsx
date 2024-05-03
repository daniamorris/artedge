import React, { useEffect, useState } from "react";
import {HttpAgent} from '@dfinity/agent';
import {AssetManager} from '@dfinity/assets';
import { useAuth, AuthProvider } from "./use-auth-client";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GalleryCard from './GalleryCard';
import data from "../data/ImageDataGal.json"
import { canisterId } from "../../../declarations/artedge_backend";

const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const galleryInfo = {
  title: 'Gallery Title',
  description:
    "Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.",
};

//replace this with real data
const featuredImages = data;
const featuredImages1 = [
  {
    title: 'My Image is great',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'This one too',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
];

export default function Album() {
  // will need canisterId for call to listImgKeyByCan(canisterId), then call each one to get gallery
  // this means I need to match principal user to canisters listCanisters: () but also userid?
  // <Route path="/PublicProfile/:id">
  // {params => <PublicProfile id={params.id} />}
  // </Route>
  const { isAuthenticated, identity, principal, whoamiActor } = useAuth();
  const isLocal = !window.location.host.endsWith('icp0.io');
  const imghost = isLocal ? 'http://127.0.0.1:4943' : window.location.hostname;
  const host = window.location.hostname;
  console.log(window.location.hostname);

  return (
    <>
      <CssBaseline />
      <AppBar position="relative" color="secondary">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Artist Gallery
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Artist Gallery
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Support this Artist</Button>
              <Button variant="outlined">Collect NFT's</Button>
              <MonetizationOnIcon color="secondary" />
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <GalleryCard  keyid={card} galpost={featuredImages}/>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}
