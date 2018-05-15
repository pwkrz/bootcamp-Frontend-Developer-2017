import { PlaylistsService } from './../playlists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'playlist-form',
  template: `
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">{{ description }}</p>
    <form #formRef='ngForm' novalidate="true" (ngSubmit)="save(formRef.valid, formRef.value)">
      <div class="form-group">
        <label>Name</label>
        <input #nameRef='ngModel' [(ngModel)]="playlist.name" required minlength="3" type="text" name="name"
              [ngClass]='{"is-invalid": (nameRef.touched  || formRef.submitted) && nameRef.errors, "form-control": true}'>
        <div *ngIf='nameRef.touched || nameRef.dirty || formRef.submitted' class='invalid-feedback'>
          <small *ngIf='nameRef.errors?.required'>Please provide a name for the playlsit</small>
          <small *ngIf='nameRef.errors?.minlength'>The name must be at least {{nameRef.errors.minlength.requiredLength}} characters long</small>
        </div>
      </div>
      <div class="form-group">
        <label>Tracks</label>
        <input [(ngModel)]="playlist.tracks" type="number" name="tracks" class="form-control">
      </div>
      <div class="form-group">
        <label>Color</label>
        <input [(ngModel)]="playlist.color" type="color" name="color" class="form-control" style='padding: 0;'>
      </div>
      <div class="form-group">
        <label>Favourite
        <input [(ngModel)]="playlist.favourite" type="checkbox" name="favourite"></label>
      </div>
      <div class="form-group">
        <button class="btn btn-success">Save</button>
      </div>
    </form>
  `,
  styles: []
})
export class PlaylistFormComponent implements OnInit {

  mode;
  playlist;
  title;
  description;

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
