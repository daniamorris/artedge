import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar.jsx";
import ListProfiles from "./ListProfiles.jsx";

function Header(props){
return(
    <>
    <ResponsiveAppBar login={props.login} loginStatus = {props.loginStatus} logout={props.logout} input={props.input} shandle = {props.shandle}/>
    {/* <ListProfiles login={props.login} loginStatus = {props.loginStatus} logout={props.logout} input={props.input} shandle = {props.shandle}/> */}
    </>
)
}
export default Header;