import { Component, OnInit, Input } from '@angular/core';
import { PlaylistSelectionService } from './playlist-selection.service';

@Component({
  selector: 'track-list',
  template: `
  <audio [src]='previewUrl' controls style="width: 100%;"></audio>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Length</th>
        <th scope="col">Play</th>
        <th *ngIf='parentRoot == "search"' scope="col" title='Add to playlist'>Add</th>
        <th *ngIf='parentRoot == "playlists"' scope="col" title='Remove from playlist'>Dump</th>
      </tr>
    </thead>
    <tbody *ngFor="let track of tracks">
      <tr>
        <th scope="row">{{ track.track_number }}</th>
        <td class='track-name' [title]='track.name'>{{ track.name }}</td>
        <td>{{ track.duration_ms | date:'mm:ss':'+0000' }}</td>
        <td class='click-icon' (click)='selectTrack(track)'>&#x25B8;</td>
        <td *ngIf='parentRoot == "search"' class='click-icon' (click)='addToPlaylist(track)' style='font-size: 2em;' title='Add to playlist'>+</td>
        <td *ngIf='parentRoot == "playlists"' class='click-icon' (click)='dump(track.id)' style='font-size: 2em;' title='Remove from playlist'>-</td>
      </tr>
    </tbody>
  </table>
  `,
  styles: [`
    .track-name {
      max-width: 326px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .click-icon {
      text-align: center;
      cursor: pointer;
      line-height: .5em;
      font-size: 3em;
      width: 1em;
    }
  `]
})
export class TrackListComponent implements OnInit {

  @Input()
  tracks;

  @Input()
  parentRoot;

  selectedTrack;
  previewUrl;

  constructor(private selectionService: PlaylistSelectionService) { }

  ngOnInit() {
  }

  addToPlaylist(track) {
    this.selectionService.addToPlaylist(track)
  }

  dump(id) {
    this.selectionService.removeFromPlaylist(id)
      .subscribe( playlist => {
        this.tracks = playlist.tracks;
      })
  }

  selectTrack(track){
    console.log(track)
    this.previewUrl = track.preview_url;
  }
}
