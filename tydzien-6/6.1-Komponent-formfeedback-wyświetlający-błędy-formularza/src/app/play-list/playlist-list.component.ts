import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
    <tbody *ngFor="let playlist of playlists; let i = index">
      <tr
          [routerLink]='playlist.id'
          [ngClass]='{"table-active": playlist == selected }'
          [ngStyle]='{backgroundColor: getBgColor(playlist.color), border: "2px solid" + playlist.color}' >
        <th scope="row">{{ i + 1 }}</th>
        <td>{{ playlist.name }}</td>
        <td>{{ playlist.tracks }}</td>
        <td><input type="checkbox" [(ngModel)]="playlist.favourite"></td>
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

  @Input()
  playlists;

  @Input()
  selected;

  // @Output("select")
  // onSelect = new EventEmitter();

  // select(playlist){

  //   this.onSelect.emit(playlist);

  // }

  constructor() { }

  ngOnInit() {
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
