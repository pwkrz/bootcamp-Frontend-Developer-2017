import { Component, OnInit, Input } from '@angular/core';
import { MusicSearchService } from '../music-search.service';

@Component({
  selector: 'album-list',
  template: `
    <h4>Albums</h4>
    <div class="card-deck card-deck-justify">
      <album-card [routerLink]='["album", album.id]'
                  *ngFor='let album of albums | async'
                  [album]="album"></album-card>
    </div>
  `,
  styles: [`
    .card-deck-justify {
      justify-content: space-between;
    }
  `]
})
export class AlbumListComponent implements OnInit {

  albums;

  constructor(private musicSearch: MusicSearchService) { }

  ngOnInit() {
    this.albums = this.musicSearch.getAlbumStream();
  }

}
