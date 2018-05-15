import { PlaylistsService, PlaylistModel } from './playlists.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'playlist-list',
  template: `
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Tracks</th>
        <th scope="col">Favourite</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let playlist of playlistStream$ | async; let i = index"
          [routerLink]='playlist.id'
          [ngClass]='{"table-active": playlist == selected }'
          [ngStyle]='{backgroundColor: getBgColor(playlist.color), border: "2px solid" + playlist.color}' >
        <th scope="row">{{ i + 1 }}</th>
        <td>{{ playlist.name }}</td>
        <td>{{ playlist.tracks.length }}</td>
        <td><input type="checkbox" [checked]="playlist.favourite" disabled></td>
      </tr>
    </tbody>
  </table>
  `,
  styles: [`
    tr {
      cursor: pointer;
    }
  `]
})
export class PlaylistListComponent implements OnInit {

  playlistStream$: Observable<PlaylistModel[]>;

  constructor(private playlistService: PlaylistsService) { }

  ngOnInit() {
    this.playlistStream$ = this.playlistService.getPlaylistStream();
  }

  getBgColor(hex){
    hex = hex.replace('#','');
    let r = parseInt(hex.substring(0,2), 16),
        g = parseInt(hex.substring(2,4), 16),
        b = parseInt(hex.substring(4,6), 16);

    let result = `rgba(${r},${g},${b},.6)`;
    return result;
  }

}
