import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'album-card',
  template: `
  <div class="card">
    <img class="card-img-top img-fluid" src="{{ album.images[0].url }}" alt="{{ album.name }}">
    <div class="card-img-overlay">
      <h5 class="card-title">{{ album.name }}</h5>
      <a href='{{ "https://open.spotify.com/album/" + album.id }}' target="_blank" class="btn btn-info btn-sm">Open in Spotify</a>
    </div>
  </div>
  `,
  styleUrls: ["./album-card.component.scss"]
})
export class AlbumCardComponent implements OnInit {

  @Input()
  album;

  constructor() { }

  ngOnInit() {
  }

}
