import React, { useState, useEffect } from "react";
import { useAuth, AuthProvider } from "./use-auth-client";
import { useLocation } from "wouter";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CircleLoading from "./CircleLoading";
import Box from '@mui/material/Box';

// import { Link } from '@mui/material';
// import Avatar from '@mui/material/Avatar';
// import { red } from '@mui/material/colors';

export default function EditImageDetail(props) {
  const [location, setLocation] = useLocation();
  const isLocal = !window.location.host.endsWith('icp0.io');
  const imghost = isLocal ? 'http://127.0.0.1:4943' : 'https://fsmcb-yaaaa-aaaal-adgsa-cai.icp0.icp0.io';
  // const imghost = window.location.hostname;  //doesn't work for localhost test for live canisters

    const { principal, whoamiActor } = useAuth();
    let actor = whoamiActor;
    const [loading, Setloading] = useState(false);
    const [mysrc, SetMysrc] = useState();

    let stringId = props.id;
    // let myW = toString(props.width);
    // let myH = toString(props.height);
    // let thisimagedata = props.imgdata;
    // console.log("we are on EditImage Detail " + thisimagedata);
//   const mydollars = <MonetizationOnIcon color="secondary" />;
//   const userlink = "/PublicProfile/" + props.id;
  // console.log(stringId + " my props " + props);
  const [upImage, setUpImage] = useState({
    key: "",
    fileName: "",
    width: "",
    height: "",
    canId: "",
    title: "",
    description: "",
    pid: "",
});
console.log("my upImage object;" + upImage);

async function displayMyImage (stringId){
  // (opt record {key:text; height:text; title:text; canId:text; description:text; fileName:text; width:text})
  let myimagedata = await actor.readImgBatch(stringId);
  console.log("we are at loadImage " + myimagedata);
  // setUpImage(myimagedata);
const { 0:{key}, 0:{fileName}, 0:{width}, 0:{height}, 0:{canId}, 0:{title}, 0:{description}, 0:{pid} } = myimagedata;
  setUpImage({
    key: key,
    fileName: fileName,
    width: width,
    height: height,
    canId: canId,
    title: title,
    description: description,
    pid: pid
  });
  // console.log(key); // Output: 'Prince Yadav'
  // console.log(canId); // Output: 26
  // console.log(title); // Output: 'New Delhi'
  // console.log(description); // Output: 'Developer'
  let mysrc = imghost + key + "?canisterId=" + canId;
  SetMysrc(mysrc);
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;
}

async function updateMyImage(stringId, upImage) {
    Setloading(true);
    // let imageUp = await actor.findImgDelete(stringId);
    let imageUpdated = await actor.updateImg(stringId, upImage);
    console.log("we update the image" + imageUpdated);
    // setUpImage(imageUpdated); //this doesn't work revisit profile for mistakes there
    Setloading(false);
  }

  const handleUpdate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setUpImage({
        ...upImage,
        title: data.get('title'),
        description: data.get('description')
    })
    updateMyImage(stringId, {
        ...upImage,
        title: data.get('title'),
        description: data.get('description')
    });
    // setLocation("/Uploads");
  }

 

//   function favoriteMe(e){
//     const {id, name} = e.currentTarget;
//     console.log("Favoriting " + id + name);
//     // addFavorite(1); //need to create this
//   }
//   function shareMe(e){
//     const {id, name} = e.currentTarget;
//     console.log("Sharing " + id + name);
//   }
//     function tipMe(e){
//     const {id, name} = e.currentTarget;
//     console.log("Tipping " + id + name);
//   }
useEffect(() => {
  Setloading(true);
  displayMyImage(stringId);
  Setloading(false);
}, []);

  return (
    <Box component="form" noValidate onSubmit={handleUpdate} sx={{ mt: 3 }}>
    <Card sx={{ maxWidth: 400 }} id={props.id}>
      <CardMedia
        sx={{ height: 200 }}
        image={mysrc}
        title={upImage.title}
      />
      <CardContent>
      {loading && <CircleLoading />}
        <Typography gutterBottom variant="h5" component="div">
        Edit your Image Details
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    // required
                    value={upImage.title}
                    onChange={e => {
                        setUpImage({
                        ...upImage,
                        title: e.target.value
                      });
                    }}
                    fullWidth
                    name="title"
                    id="title"
                    label="Image Title"
                    autoFocus
                    InputLabelProps={{
                    shrink: true,
                    }}
                ></TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    value={upImage.description}
                    onChange={e => {
                        setUpImage({
                        ...upImage,
                        description: e.target.value
                        });
                    }}
                    fullWidth
                    name="description"
                    label="Image Description"
                    id="description"
                    autoComplete="description"
                    multiline
                    rows={4}
                    InputLabelProps={{
                    shrink: true,
                    }}
                ></TextField>
            </Grid>
            <Grid item xs={12}>
            <Button
                    type="submit"
                    // onClick={handleUpdate}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Submit to Update
                </Button>
                <Button
                  onClick={() => setLocation("/Uploads")}
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 3, mb: 2 }}
                >
                    Back to Uploads
                </Button>
            </Grid>
        </Grid>
      </CardContent>
    </Card>
    </Box>
  );
}
