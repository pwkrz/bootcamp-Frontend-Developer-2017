import { PlaylistsService } from './../play-list/playlists.service';
import { Component, OnInit } from '@angular/core';
import { PlaylistSelectionService } from './playlist-selection.service';

@Component({
  selector: 'playlist-selector',
  template: `
    <div class="input-group">
      <label class="col-4 col-form-label">Selected playlist</label>
      <select class='form-control' [ngModel]='selectedId'
              (ngModelChange)='setSelected($event)'>
          <option *ngFor='let playlist of playlists' [value]="playlist.id">
            {{ playlist.name }} ({{ playlist.tracks.length }})
          </option>
      </select>
    </div>
  `,
  styles: []
})
export class PlaylistSelectorComponent implements OnInit {

  selectedId;
  playlists = [];

  constructor(private selectionService: PlaylistSelectionService,
              private playlistService: PlaylistsService) { }

  ngOnInit() {
    this.selectionService.getIdStream()
      .subscribe( id => {
        this.selectedId = id;
      });

    this.playlistService.getPlaylistStream()
      .subscribe( playlists => {
        this.playlists = playlists;
      });
  }

  setSelected(id) {
    this.selectionService.select(id);
  }
}
