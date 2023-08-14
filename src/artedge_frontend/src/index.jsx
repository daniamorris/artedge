import {createActor, artedge_backend } from "../../declarations/artedge_backend";
import {AuthClient} from "@dfinity/auth-client"
import {HttpAgent} from "@dfinity/agent";
import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import Album from "./Album";
import SignInSide from "./SignInSide";
import Contact from "../../routes/contact";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Container } from '@mui/material';
import "../assets/main.css";
import Master from "./Master";

const itemData = [{img: 'https://source.unsplash.com/random?wallpapers', title: 'Hello World'},{img: 'https://source.unsplash.com/random?wallpapers', title: 'Hello World'},{img: 'https://source.unsplash.com/random?wallpapers', title: 'Hello World'},{img: 'https://source.unsplash.com/random?wallpapers', title: 'Hello World'},{img: 'https://source.unsplash.com/random?wallpapers', title: 'Hello World'},{img: 'https://source.unsplash.com/random?wallpapers', title: 'Hello World'},{img: 'https://source.unsplash.com/random?wallpapers', title: 'Hello World'},{img: 'https://source.unsplash.com/random?wallpapers', title: 'Hello World'},{img: 'https://source.unsplash.com/random?wallpapers', title: 'Hello World'},];
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

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Artedge
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Profile() {
  return (
    <>
      <img
        src="https://i.imgur.com/MK3eW3As.jpg"
        alt="Katherine Johnson"
    />
    </>
  );
}


const MyArt = () => {
  let actor = artedge_backend;

  //const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [message2, setMessage2] = React.useState('');
  const [points, getPoints] = React.useState('');
  const [spoints, setPoints] = React.useState('');
  //const [ipoints, incPoints] = React.useState('');

  async function doGet() {
    //const greeting = await custom_greeting_backend.greet(name);
    const points = await actor.get();
    getPoints(points);
    console.log(points);
    document.getElementById("counter").innerHTML = "I have: " + points + " points";
  }
    async function doInc() {
    //const greeting = await custom_greeting_backend.greet(name);
    const ipoints = await actor.inc();
    //incPoints(ipoints);
  }
    async function doSet() {
    //const greeting = await custom_greeting_backend.greet(name);
    const spoints = await actor.set(0);
    setPoints(spoints);
  }
    async function doGreet() {
    //const greeting = await custom_greeting_backend.greet(name);
    const greeting = await actor.greet();
    setMessage(greeting);
  }
    async function doGreet2() {
    //const greeting = await custom_greeting_backend.greet(name);
    const greeting2 = await actor.greet2();
    setMessage2(greeting2);
  }

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

    // At this point we're authenticated, and we can get the identity from the auth client:
    const identity = authClient.getIdentity();
    // Using the identity obtained from the auth client, we can create an agent to interact with the IC.
    const agent = new HttpAgent({identity});
    // Using the interface description of our webapp, we create an actor that we use to call the service methods.
    actor = createActor(process.env.ARTEDGE_BACKEND_CANISTER_ID, {
      agent,
    });
    //const greeting = await custom_greeting_backend.greet(name);
    //setName(identity);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="art" element={<Album />} />
          <Route path="support" element={<SignInSide />} />
          <Route path="master" element={<Master />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Contact />} />
          <Route path="logo" element={<img src="logoMarklg.png" alt="artedge logo" />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      <Container maxWidth="sm">
      <div>
      <p>Welcome to Art Edge</p>
        <Button variant="contained" onClick={doLog}>Login</Button>
        <p>
          {" "}
        </p>
        </div>
      <div style={{ margin: "30px" }}>
        <Button variant="contained" color="success" onClick={doGreet2}>Logged in User</Button><br/>
        <Button variant="contained" color="secondary" onClick={doGet}>Total Points</Button><br/>
        <Button variant="contained" color="info" onClick={doSet}>reset my points</Button><br/>
        <Button variant="contained" color="primary" onClick={doInc}>Increment by one point</Button>
      </div>
      <div>
        <h4>
        <span style={{ color: "blue" }}>{message}</span>
        <span style={{ color: "pink" }}>{message2}</span>
        <span style={{ color: "blue" }}>{points}</span>
        <span style={{ color: "green" }}>{spoints}</span>
        </h4>
      </div>
      <div id="counter">
      <h4>

      </h4>
      </div>
      <ImageList sx={{ width: 500, height: 500 }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
      </Container>
      {/* Footer */}
      <Box sx={{ bgcolor: '#4a148c', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Art Edge
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Terms of Use | Cookie Policy | Privacy Policy
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
};

function Layout() {
  return (
    <div>
      <ResponsiveAppBar />
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function NoMatch() {
}

render(<React.StrictMode>
  <BrowserRouter>
    <MyArt />
  </BrowserRouter>
</React.StrictMode>, document.getElementById("root"));