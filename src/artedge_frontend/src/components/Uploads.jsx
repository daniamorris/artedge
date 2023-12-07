import React from "react";
import {Ed25519KeyIdentity} from '@dfinity/identity';
import {HttpAgent} from '@dfinity/agent';
import {AssetManager} from '@dfinity/assets';
import {useEffect, useState} from "react";
import Masonry from "react-masonry-css";
import '../App.css';
import { Button } from "@mui/material";
import {createActor, artedge_backend} from "../../../declarations/artedge_backend";

let actor = artedge_backend;

// https://agent-js.icp.xyz/assets/index.html for @dfinity/assets info includs get and delete
// create an asset canister for the profile principal to upload to 
// Hardcoded principal: 535yc-uxytb-gfk7h-tny7p-vjkoe-i4krp-3qmcl-uqfgr-cpgej-yqtjq-rqe
// Should be replaced with authentication method e.g. Internet Identity when deployed on IC
let ddm = "hcwzc-nsfu5-fknaq-q2y75-g5x3b-gaphq-y5gz7-5ulkc-rkiw3-5khv7-tqe";
// const identity = authClient.getIdentity();

const identity = Ed25519KeyIdentity.generate(new Uint8Array(Array.from({length: 32}).fill(0)));
// const identity = Ed25519KeyIdentity.generate(new Uint8Array(Array.from({length: 32}).fill(0)));
const isLocal = !window.location.host.endsWith('ic0.app');
const agent = new HttpAgent({
    host: isLocal ? `http://127.0.0.1:${window.location.port}` : 'https://ic0.app', identity,
});
if (isLocal) {
    agent.fetchRootKey();
}

// // Canister id can be fetched from URL since frontend in this example is hosted in the same canister as file upload
// const canisterId = new URLSearchParams(window.location.search).get('canisterId') ?? /(.*?)(?:\.raw)?\.ic0.app/.exec(window.location.host)?.[1] ?? /(.*)\.localhost/.exec(window.location.host)?.[1];
//will need to get the canisterId of the user's asset cansiter (let myUpload = "U" # stringId;)
const canisterId = process.env.ARTEDGE_FRONTEND_CANISTER_ID;

// // Create asset manager instance for above asset canister
const assetManager = new AssetManager({canisterId, agent});

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
    const [uploads, setUploads] = useState([]);
    const [progress, setProgress] = useState(null);
    const [myBatch, setMyBatch] = useState({
        upid: "",
        pid: "",
        batch: {0: {}}
        
      });

      const handleSave = (event) => {
        event.preventDefault();
        const data = event.currentTarget;
        setMyBatch ({
          upid: data.id,
          pid: data.name,
          batch: {0: {uploads}}
        });
        // key, fileName, width, height (upload data)
        saveIt({
            upid: data.id,
            pid: data.name,
            batch: {0: {uploads}}
        });
        console.log("saved a Batch" + data.name);
        // saveIt(myBatch);
      };
      
      const handleList = (event) => {
        event.preventDefault();
        const data = event.currentTarget;
        // setMyBatch ({
        //   upid: data.id,
        //   pid: data.name,
        //   batch: uploads
        // });
        // // key, fileName, width, height (upload data)
        // saveIt({
        //     upid: data.id,
        //     pid: data.name,
        //     batch: uploads
        // });
        console.log("listing files " + data.name);
        listFiles();
    };

    async function saveIt(myBatch){
        // const { 0: { key } } = uploads;
        // const {key} = uploads;
        // public type BatchUpload = {
        //     upid: 1;
        //     pid: 1;
        //     batch: uploads;
        //   };

        console.log("i am here" + uploads);
        let myBatchId = await actor.saveBatchUpload(myBatch);
        console.log("my batch" + myBatchId);
        console.log("my uploads" + uploads);
        //how do I iterate over the images here to then save each one
        //also is this redundant? the assetcansiter is saving the batch
        //do i just create the hash and add or delete to mimic the assetmanager?
        //const mybatch = await actor.saveBatchUpload(batch : Types.Image);
    };

    async function listFiles(){
        const files = await assetManager.list();
        console.log(files);
        const asset = await assetManager.get('/uploads/squares1.500.500.jpg');
        const blob = await asset.toBlob();
        const url = URL.createObjectURL(blob);
        console.log(url);
    }

    useEffect(() => {
        assetManager.list()
            .then(assets => assets
                .filter(asset => asset.key.startsWith('/uploads/'))
                .sort((a, b) => Number(b.encodings[0].modified - a.encodings[0].modified))
                .map(({key}) => detailsFromKey(key)))
            .then(setUploads);
    }, []);

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
                    console.log("here for each file" + key);
                    return {key, fileName, width, height};
                }));
                await batch.commit({onProgress: ({current, total}) => setProgress(current / total)});
                setUploads(prevState => [...items, ...prevState]);
                console.log("I am here with uploads" + uploads);
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
        <div className={'App-wrapper'}>
            <Button id={"1"} name={"list button"} variant="contained" onClick={handleList}>List files</Button>
            <Button id={"1"} name={"handle save butt"} variant="contained" onClick={handleSave}>Save batch</Button>
            <Masonry breakpointCols={{default: 4, 600: 2, 800: 3}} className={'App-masonry'}
                     columnClassName="App-masonry-column">
                <button className={'App-upload'} onClick={uploadPhotos}>📂 Upload photo</button>
                {uploads.map(upload => (
                    <div key={upload.key} className={'App-image'} style={{aspectRatio: upload.width / upload.height}}>
                        <img src={upload.key} alt={upload.fileName} loading={'lazy'}/>
                    </div>))}
            </Masonry>
            {progress !== null && <div className={'App-progress'}>{Math.round(progress * 100)}%</div>}
        </div>
    );
}

export default Uploads;
