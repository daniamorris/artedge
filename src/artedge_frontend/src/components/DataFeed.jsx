import React, { useEffect, useState } from "react";
import { useAuth, AuthProvider } from "./use-auth-client";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import data from "../data/ImageData.json"
import BasicModal from "./BasicModal";
import { Button } from '@mui/material';
import CircleLoading from "./CircleLoading";

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 500,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

export default function DataFeed({input, addPoints}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [myModal, setMyModal] = useState("");
  const [loading, Setloading] = useState(false);

  const { whoamiActor } = useAuth();
  const isLocal = !window.location.host.endsWith('icp0.io');
  const imghost = isLocal ? 'http://127.0.0.1:4943' : window.location.hostname;
  const [imgData, setImgData] = useState([]);
 
  const listMyImages = async () => {
    const myImageList = await whoamiActor.listImages();
    setImgData(myImageList);
    };

  function shutit(){
    setMyModal("");
  }

  function handleClicked(e){
    const {name, title, id, src, alt, loading} = e.target;
    setMyModal(<BasicModal id={id} title={title} image={src} desc={alt} open={handleOpen} onClose={shutit}/>);
    // addPoints(1); Add this back when I fix logged in vs logged out
  }

    const filteredData = imgData.filter((el) => {
    // const filteredData = data.filter((el) => {
      if (input === '') {
          return el;
      } else {
        // return el.title.toLowerCase().includes(input)
        return el[1].title.toLowerCase().includes(input)
      }
    }) 

    useEffect(() => {
      Setloading(true);
      listMyImages();
      Setloading(false);
    }, []);
    
  return (
    <>
    {myModal}
    {/* <ImageList sx={{ width: 500, height: 500 }} cols={3} rowHeight={164}>
      {filteredData.map((item) => (
        <ImageListItem key={item.key} kid={item.key} name={item.img} onClick={handleClicked}>
          <img
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            alt={item.desc}
            loading="lazy"
            name={item.img}
            title={item.title}
            id={item.pid}
          />
        </ImageListItem>
      ))}
    </ImageList> */}
    {/* <Button variant="contained" onClick={listMyImages}>create a list of images</Button> */}
    {loading && <CircleLoading />}
    <ImageList sx={{ width: 500, height: 500 }} cols={3} rowHeight={164}>
                {/* {imgData.map((image) => ( */}
                  {filteredData.map((image) => (
                    <ImageListItem key={image[0]} onClick={handleClicked}>
                    <img
                    // srcSet={`${mysrcset}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={imghost + image[1].key + "?canisterId=" + image[1].canId}
                    alt={image[1].description}
                    loading="lazy"
                    name={image[1].fileName}
                    title={image[1].title}
                    id={image[1].pid}        
                    />
                    </ImageListItem>
                ))}
    </ImageList>
    </>
  );
}
