import "../sass/main.scss"
// import {setPosition, stopPropag, hideMenu} from "./menu-events";
import $ from "jquery";
import * as bxSlider from "bxslider";
try { require( "../uploads/"+/\*.*$/ ) }
catch(err){ console.log( `Funkcja używana do importu obrazków z folderu "Uploads" - ${err}` ) }

$(function(){
    $('.bxslider').bxSlider();
  });

