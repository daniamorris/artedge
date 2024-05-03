import {HttpAgent} from '@dfinity/agent';
import {AssetManager} from '@dfinity/assets';
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import '../App.css';
import { useAuth, AuthProvider } from "./use-auth-client";
import { Button } from '@mui/material';
import CircleLoading from "./CircleLoading";
import Box from '@mui/material/Box';
import { useLocation } from "wouter";

// Get file name, width and height from key
const detailsFromKey = (key) => {
    const fileName = key.split('/').slice(-1)[0];
    const width = parseInt(fileName.split('.').slice(-3)[0]);
    const height = parseInt(fileName.split('.').slice(-2)[0]);
    return {key, fileName, width, height}
}

// Get file name, width and height from file
const detailsFromFile = async (file) => {
    const src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    })
    const [width, height] = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve([img.naturalWidth, img.naturalHeight]);
        img.src = src;
    })
    const name = file.name.split('.');
    const extension = name.pop();
    const fileName = [name, width, height, extension].join('.');
    return {fileName, width, height}
}

const Uploads = (props) => {
    const [location, setLocation] = useLocation();
    const { isAuthenticated, identity, principal, whoamiActor } = useAuth();
    const [loading, Setloading] = useState(false);
    const mypid = props.proid;
    const [myCanisterId, setMyCanisterId] = useState(process.env.CANISTER_ID_ARTEDGE_FRONTEND); //my default frontend for dev
    // const [myCanisterId, setMyCanisterId] = useState("fsmcb-yaaaa-aaaal-adgsa-cai"); //my default frontend for ic dev 
    // const [myCanisterId, setMyCanisterId] = useState("6pcc4-caaaa-aaaal-add5q-cai"); //my default frontend for ic live 
    const [deleteIm, setDeleteIm] = useState("")

    async function getMyCanisterId(){
        const gotCanisterId = await whoamiActor.getMyUpCanister(principal);
        // console.log("first before if can: " + gotCanisterId);
        if (!gotCanisterId == "" | null){
          setMyCanisterId(gotCanisterId);
        //   console.log("got can: " + gotCanisterId);
        } else {
            const newCanisterId = await whoamiActor.createUploads();
            setMyCanisterId(newCanisterId);
            // console.log( "created a new Canister:" + newCanisterId);
        }
        Setloading(false);
      }
    
    const isLocal = !window.location.host.endsWith('icp0.io');
    const agent = new HttpAgent({
        host: isLocal ? `http://127.0.0.1:${window.location.port}` : 'https://icp0.io', identity,
    });
    if (isLocal) {
        agent.fetchRootKey();
    }

    async function deleteMyImage(stringId) {
        let imageDeleted = await whoamiActor.findImgDelete(stringId);
        let imageDeleted2 = await whoamiActor.deleteImg(imageDeleted);
        setDeleteIm(imageDeleted2);
    };
      
    const handleDelete = (event) => {
        event.preventDefault();
        let mmykey = (event.currentTarget.name);
        let deleted = assetManager.delete(mmykey);
        let alsodeleted = deleteMyImage(mmykey);
    };
      
    const handleEdit = (event) => {
        event.preventDefault();
        let id = (event.currentTarget.id);
        editImage(id);
    };

    async function editImage(stringId) {
        Setloading(true);
        let imageSelected = await whoamiActor.findImgDelete(stringId);
        const editlink = "/EditImageDetail/" + imageSelected;
        setLocation(editlink);
        Setloading(false);
    };

    const imghost = isLocal ? 'http://127.0.0.1:4943' : 'https://6pcc4-caaaa-aaaal-add5q-cai.icp0.io';
    // const imghost = window.location.hostname;  //doesn't work for localhost test for live canisters
    const canisterId = myCanisterId;

    // Create asset manager instance for above asset canister
    const assetManager = new AssetManager({canisterId, agent});

    const [uploads, setUploads] = useState([]);
    const [progress, setProgress] = useState(null);

    useEffect(() => {
        Setloading(true);
        assetManager.list()
            .then(assets => assets
                .filter(asset => asset.key.startsWith('/uploads/'))
                .sort((a, b) => Number(b.encodings[0].modified - a.encodings[0].modified))
                .map(({key}) => detailsFromKey(key)))
            .then(setUploads);
            getMyCanisterId();
    }, [myCanisterId, deleteIm]);

    const uploadPhotos = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.onchange = async () => {
            setProgress(0);
            try {
                const batch = assetManager.batch();
                const items = await Promise.all(Array.from(input.files).map(async (file) => {
                    const {fileName, width, height} = await detailsFromFile(file);
                    const key = await batch.store(file, {path: '/uploads', fileName});
                    //saving image data to work with later
                    const thisBkey = await whoamiActor.saveImagesUpload({
                        key: key,
                        fileName: fileName,
                        width: String(width),
                        height: String(height),
                        canId: canisterId,  
                        title: fileName,
                        description: fileName,
                        pid: mypid,
                    });
                    // console.log(thisBkey);
                    return {key, fileName, width, height};
                }));
                await batch.commit({onProgress: ({current, total}) => setProgress(current / total)});
                setUploads(prevState => [...items, ...prevState])
            } catch (e) {
                if (e.message.includes('Caller is not authorized')) {
                    alert("Caller is not authorized, follow Authorization instructions in README");
                } else {
                    throw e;
                }
            }
            setProgress(null)
        };
        input.click();
    }

    return (
        <>           
            {/* {myModal}    */}
            <Box
            sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
            >
                {loading && <CircleLoading />}
                {/* <Typography> */}
                <h1>Click Images to Edit Details</h1>
                {/* </Typography> */}
            </Box>
            <div className={'App-wrapper'}>
                <Masonry breakpointCols={{default: 4, 600: 2, 800: 3}} className={'App-masonry'}
                        columnClassName="App-masonry-column">
                    <button className={'App-upload'} onClick={uploadPhotos}>📂 Upload photo</button>
                    {uploads.map(upload => (
                        <div key={upload.key} className={'App-image'} style={{aspectRatio: upload.width / upload.height}}>
                            <img src={imghost + upload.key + "?canisterId=" + canisterId} name={canisterId} alt={upload.fileName} id={upload.key} width={upload.width} height={upload.height} loading={'lazy'} onClick={handleEdit}/>
                            <Button variant="contained" name={upload.key} onClick={handleDelete}>delete me</Button>
                            {/* <Button variant="contained" name={upload.key} onClick={handleEdit}>edit me</Button> */}
                        </div>))}
                </Masonry>
                {progress !== null && <div className={'App-progress'}>{Math.round(progress * 100)}%</div>}
            </div>
        </>
    );
}

export default Uploads;