import { Subject } from 'rxjs';
import { PlaylistsService } from './../play-list/playlists.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PlaylistSelectionService {

  selectedId;
  idStream$ = new Subject();

  constructor(private playlistService: PlaylistsService) {
    
    this.playlistService.getPlaylistStream()
      .subscribe( playlists => { if (!this.selectedId) this.select(playlists[0]); });
  }

  getIdStream() {
    return this.idStream$.asObservable().startWith(this.selectedId);
  }

  select(playlistId) {
    this.selectedId = playlistId;
    this.idStream$.next(this.selectedId);
  }
  
  addToPlaylist(track) {
    this.playlistService.addToPlaylist(this.selectedId, track);
  }
}
