import { Component, OnInit } from '@angular/core';
import { MusicSearchService } from './music-search.service';

@Component({
  selector: 'music-search',
  templateUrl: './music-search.component.html',
  styleUrls: ['./music-search.component.scss']
})
export class MusicSearchComponent implements OnInit {

  albums;

  constructor(private musicSearch: MusicSearchService) { }

  ngOnInit() {
    // this.musicSearch.getAlbums( albums => {
    //   this.albums = albums;
    // });
  }

}
