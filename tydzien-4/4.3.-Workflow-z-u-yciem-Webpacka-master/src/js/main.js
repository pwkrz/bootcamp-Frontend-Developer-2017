import "../sass/main.scss"
// import {setPosition, stopPropag, hideMenu} from "./menu-events";
import {init as sliderInit} from "bxslider";

try { require( "../uploads/"+/\*.*$/ ) }
catch(err){ console.log( `Funkcja używana do importu obrazków z folderu "Uploads" - ${err}` ) }