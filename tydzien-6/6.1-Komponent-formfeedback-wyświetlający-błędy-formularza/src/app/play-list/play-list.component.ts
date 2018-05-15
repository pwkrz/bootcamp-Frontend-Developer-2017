import { Component, OnInit } from '@angular/core';

import { PlaylistsService } from "./playlists.service";

@Component({
  selector: 'play-list',
  templateUrl: './play-list.component.html',
  styles: []
})
export class PlayListComponent implements OnInit {

  playlists: Array<object>;

  constructor() {
  }

  // selected;
  // mode;
  // edited = { };

  // select(playlist){

  //   this.mode = "select";
  //   this.selected = playlist;

  // }

  // edit(playlist){

  //   this.mode = "edit";
  //   this.edited = Object.assign({}, playlist);;

  // }

  // createNew(){

  //   this.mode = "edit";
  //   this.edited = this.playlistsService.createPlaylist();
  //   this.selected = { ...this.edited, name: "New playlist" };

  // }

  // save(newPlaylist){
  //   this.mode = "none";
  //   this.playlistsService.savePlaylist(newPlaylist);
  // }

  ngOnInit() {
  }

}
