import React, { useEffect, useState } from "react";
import { Link, Route } from "wouter";
import {createActor, artedge_backend} from "../../../declarations/artedge_backend";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];
const mypeople = [{
  id: 1, 
  pid: 1,
},{
  id: 2, 
  pid: 2}
]

export const people2 = [{
  id: 0, // Used in JSX as a key
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1, // Used in JSX as a key
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2, // Used in JSX as a key
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3, // Used in JSX as a key
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4, // Used in JSX as a key
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];

function ListProfiles(){
  let actor = artedge_backend;
  const userlink = "/PublicProfile/";
  const [profiles, setProfiles] = useState(people2);
  const listItems = profiles.map(person =>
    <li key={person.id}><Link href={userlink + person.id}>{person.id}</Link></li>
  );
async function getProfiles(){
  let myprofiles = await actor.listProfiles();
  console.log(myprofiles);
  let myprofilesIds = await actor.listProfilIds();
  console.log(myprofilesIds);
  console.log(people);
  const newVal = myprofilesIds.substring(0, myprofilesIds.length - 1);
  var arr = eval("[" + newVal + "]");
  // let usingSplit = newVal.split('-');
  // console.log(usingSplit);
  console.log(arr);
  setProfiles(arr);
}

function onClick(){
  getProfiles();
}

function clickedImage(){
  console.log("I clicked the image")
}

  return(
    <>
      <Button variant="contained" onClick={onClick}>List Profiles</Button>
      <Typography color="secondary" noWrap>
        <ul>{listItems}</ul>
      </Typography>
    </>
  )
}

export default ListProfiles;