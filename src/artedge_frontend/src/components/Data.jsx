import React, { useEffect, useState } from "react";
import { useAuth, AuthProvider } from "./use-auth-client";
import { Button } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function Data() {

    const { isAuthenticated, identity, principal, whoamiActor } = useAuth();
    const isLocal = !window.location.host.endsWith('icp0.io');
    const imghost = isLocal ? 'http://127.0.0.1:4943' : window.location.hostname;
    const [imgData, setImgData] = useState([]);
    
    const listMyImages = async () => {
        const myImageList = await whoamiActor.listImages();
        setImgData(myImageList);
    };

    // const mysrcset = "http://localhost:8080/squares5.jpg";
    const mysrc = "http://127.0.0.1:4943/uploads/squares5.500.500.jpg?canisterId=b77ix-eeaaa-aaaaa-qaada-cai";
    const myalt = "my title";
    const thissrc = imghost + "/uploads/squares5.500.500.jpg" + "?canisterId=b77ix-eeaaa-aaaaa-qaada-cai";
    console.log(thissrc); 

    return (
        <>
            <Button variant="contained" onClick={listMyImages}>create a list of images</Button>
            <ImageList sx={{ width: 500, height: 500 }} cols={3} rowHeight={164}>
                {imgData.map((image) => (
                    <ImageListItem key={image[0]}>
                    <img
                    // srcSet={`${mysrcset}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={imghost + image[1].key + "?canisterId=" + image[1].canId}
                    alt={image[1].key}
                    loading="lazy"
                    />
                    </ImageListItem>
                ))}
            </ImageList>
                {/* <ImageList sx={{ width: 500, height: 500 }} cols={3} rowHeight={164}>
                {mydata.map((item) => (
                    <ImageListItem key={item.key} kid={item.key} name={item.img} onClick={listMyImages}>
                    <img
                        // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
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
        </>
    );
}