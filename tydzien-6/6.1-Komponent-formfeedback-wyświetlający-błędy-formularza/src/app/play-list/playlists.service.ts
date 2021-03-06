import { Subject } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { Http } from '@angular/http';

export interface PlaylistModel {
  id?: number,
  name: string,
  description?: string,
  tracks: any[],
  category?: string,
  color: string,
  favourite: boolean
}

@Injectable()
export class PlaylistsService {

  playlists: PlaylistModel[] = [];
  serverUrl = 'http://localhost:3000/playlists';
  playlistStream$ = new Subject<PlaylistModel[]>();

  constructor(private http: Http) {
  }

  addToPlaylist(playlistId, track) {

    let playlist = this.playlists.find( playlist => playlist.id == playlistId );

    playlist.tracks.push(track);

    this.savePlaylist(playlist)
      .subscribe( () => {} )

  }

  removeFromPlaylist(playlistId, trackId) {

    let playlist = this.playlists.find( playlist => playlist.id == playlistId );

    playlist.tracks = playlist.tracks.filter( track => track.id != trackId );

    return this.savePlaylist(playlist);
  }

  savePlaylist(playlist) {
    let request;

    if (playlist.id) {
      request = this.http.put(`${this.serverUrl}/${playlist.id}`, playlist);
    } else {
      // playlist.id = Date.now();
      request = this.http.put(this.serverUrl, playlist);
    }

    return request
      .map( resp => resp.json() )
      .do( () => { this.getPlaylists(); });
  }

  getPlaylists() {
    return this.http.get( this.serverUrl )
                    .map( resp => resp.json() )
                    .subscribe( playlists => {
                      this.playlists = playlists;
                      this.playlistStream$.next(this.playlists);
                    });
  }

  getPlaylistStream(){
    if (!this.playlists.length) this.getPlaylists();

    return this.playlistStream$.asObservable().startWith(this.playlists);
  }

  getPlaylist(id) {
    return this.http.get(`${this.serverUrl}/${id}`)
                    .map( resp => resp.json() );
  }

  createPlaylist() {
    const newPlaylist = {
      name: '',
      tracks: 0,
      color: '#FF0000',
      favourite: false
    };
    return Object.assign({}, newPlaylist);
  }

}
