import { PlaylistsService } from './../playlists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'playlist-form',
  templateUrl: 'playlist-form.component.html',
  styles: []
})
export class PlaylistFormComponent implements OnInit {

  mode;
  playlist;
  title;
  description;
  categories = ['yes wave','desindustrialização','désintéressement']

  constructor(private activeRoute: ActivatedRoute,
              private playlistService: PlaylistsService,
              private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe( params => {

      let id = parseInt( params['id'] );

      if (id) {

        let playlist = this.playlistService.getPlaylist(id);
        this.playlist = Object.assign({}, playlist);
        this.title = `Editing: ${this.playlist.name}`;
        this.description = "Use the form to edit playlist details.";

      } else if (this.activeRoute.snapshot.url[0].path === 'new') {

        this.playlist = this.playlistService.createPlaylist();
        this.title = 'New playlist';
        this.description = "Use the form to edit playlist details.";

      }
    });
  }

  save(valid, data){

    console.log(valid, data)

    if (!valid) return;

    this.playlistService.savePlaylist(this.playlist);

    this.router.navigate(['playlists', this.playlist.id]);

  }

}
