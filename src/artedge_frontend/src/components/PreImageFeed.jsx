import React, { useEffect, useState } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import data from "../data/ImageData.json"
import BasicModal from "./BasicModal";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PreImageFeed({input}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [myModal, setMyModal] = useState("");

  function shutit(){
    setMyModal("");
  }

  function handleClicked(e){
    const {name, title, id, src, alt, loading} = e.target;
    setMyModal(<BasicModal id={id} title={title} image={src} desc={alt} open={handleOpen} onClose={shutit}/>);
  }

    const filteredData = data.filter((el) => {
      if (input === '') {
          return el;
      } else {
          return el.title.toLowerCase().includes(input)
      }
    }) 
    
  return (
    <>
    {myModal}
    <ImageList sx={{ width: 500, height: 500 }} cols={3} rowHeight={164}>
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
    </ImageList>
    </>
  );
}
