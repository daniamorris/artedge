import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Typography from '@mui/material/Typography'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { teal } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import { Link } from "react-router-dom";

const defaultTheme = createTheme({
    palette: {
      primary: purple,
      secondary: teal,
    },
  });

export default function Navigation() {
    return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            artedge
            <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/art">art</Link>
          </li>
          <li>
            <Link to="/support">support</Link>
          </li>
        </ul>
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
    );

}