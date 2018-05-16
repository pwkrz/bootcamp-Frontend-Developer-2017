import { PlaylistsService, PlaylistModel } from './../playlists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'playlist-selected',
  template: `
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">{{ description }}</p>
    <div *ngIf='playlist'>
      <track-list *ngIf='playlist.tracks.length' parentRoot='playlists' [tracks]='playlist.tracks'></track-list>
      <button class="btn btn-primary" (click)="edit()">Edit</button>
    </div>

  `,
  styles: []
})
export class PlaylistSelectedComponent implements OnInit {

  playlist;
  mode;
  title = "No playlist selected";
  description = "Select a playlist from the playlist list.";

  constructor(private activeRoute: ActivatedRoute,
              private playlistSearch: PlaylistsService,
              private router: Router) {
  }

  ngOnInit() {

    this.activeRoute.params.subscribe( params => {

      let id = parseInt( params['id'] );

      if(id){
        this.mode = 'select';
        this.playlistSearch.getPlaylist(id)
          .subscribe( (playlist: PlaylistModel) => {

            this.playlist = playlist;
            this.title = playlist.name;
            this.description = "Click the button to edit details:"
          });
      }
    }) 
  }

  edit(){
    this.router.navigate(['playlists', this.playlist.id, 'edit']);
  }
}
