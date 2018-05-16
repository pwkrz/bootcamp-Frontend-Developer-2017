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
      </tr>
    </thead>
    <tbody *ngFor="let track of tracks">
      <tr>
        <th scope="row">{{ track.track_number }}</th>
        <td class='track-name' [title]='track.name'>{{ track.name }}</td>
        <td>{{ track.duration_ms | date:'mm:ss':'+0000' }}</td>
        <td (click)='selectTrack(track)' style='cursor: pointer; line-height: .5em; font-size: 3em; width: 1em'>&#x25B8;</td>
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
  `]
})
export class TrackListComponent implements OnInit {

  @Input()
  tracks;

  selectedTrack;
  previewUrl;

  constructor(private selectionService: PlaylistSelectionService) { }

  ngOnInit() {
  }

  addToPlaylist(track) {
    this.selectionService.addToPlaylist(track)
  }

  selectTrack(track){
    console.log(track)
    this.previewUrl = track.preview_url;
  }
}
