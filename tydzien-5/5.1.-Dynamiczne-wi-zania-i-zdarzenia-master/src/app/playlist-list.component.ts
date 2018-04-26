import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'playlist-list',
  templateUrl: './playlist-list.component.html',
  styles: [`
    .p-list-table td:nth-of-type(1){
      
    }
  `]
})
export class PlaylistListComponent implements OnInit {

  hovered = false;
  
  playlists = [
    {
      name: "Magma - Best ov",
      tracks: 23,
      color: "#4286f4"
    },
    {
      name: "Soft Machine - Greatest Hits",
      tracks: 55,
      color: "#44f441"
    },
    {
      name: "Faust - Singles",
      tracks: 100,
      color: "#f49441"
    }
  ]

  
    // + "; background-clip: text; mix-blend-mode: difference !important"
    // for( let el of ev.target.children){
    //   if(el.innerHTML.indexOf("input") < 0){
    //     el.setAttribute("style", " mix-blend-mode: exclusion")
    //   }
    // };
    
 

  constructor() { }

  ngOnInit() {
  }

}
