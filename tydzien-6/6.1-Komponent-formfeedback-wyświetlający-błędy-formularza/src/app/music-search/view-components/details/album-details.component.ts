import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicSearchService } from '../../music-search.service';

@Component({
  selector: 'album-details',
  template: `
    <div class="row mt-3" *ngIf="album" >
      <div class="col">
        <album-card [album]="album"></album-card>
      </div>
      <div class="col">
        <h4 class="display-4 mb-4 text-right">Tracks</h4>
        <track-list parentRoot='search' [tracks]="album.tracks.items"></track-list>
      </div>
    </div>
  `,
  styles: []
})
export class AlbumDetailsComponent implements OnInit {

  album;

  constructor(private musicSearch: MusicSearchService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {

    let id = this.activeRoute.snapshot.params['album_id'];
    
    this.musicSearch.getAlbum(id)
      .subscribe( album => {console.log(album); this.album = album} );
  }

}
