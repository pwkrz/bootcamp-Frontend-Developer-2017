import $ from "jquery";
import * as bxSlider from "bxslider";
// import {setPosition, stopPropag, hideMenu} from "./menu-events";
try {
  require( "../sass/main.scss" );
  require( "../uploads/"+/\*.*$/ );
} catch(err){
  console.log( `sass/main.scss and content of /uploads are imported for webpack purposes: ${err}` )
}

$(function(){
    $('.bxslider').bxSlider({
      controls: false
    });
  });

