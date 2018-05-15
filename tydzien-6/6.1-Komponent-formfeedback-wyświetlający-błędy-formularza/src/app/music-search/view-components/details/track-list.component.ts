import { Component, OnInit, Input } from '@angular/core';

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
        <td>{{ track.name }}</td>
        <td>{{ track.duration_ms }}</td>
        <td (click)='selectTrack(track)' style='cursor: pointer; line-height: .5em; font-size: 3em; width: 1em'>&#x25B8;</td>
      </tr>
    </tbody>
  </table>
  `,
  styles: []
})
export class TrackListComponent implements OnInit {

  @Input()
  tracks;

  selectedTrack;
  previewUrl;

  constructor() { }

  ngOnInit() {
  }

  selectTrack(track){
    console.log(track)
    this.previewUrl = track.preview_url;
  }
}
