import { Injectable, Inject, Optional } from '@angular/core';

@Injectable()
export class PlaylistsService {

  playlists = [];
  //   {
  //     name: "Magma: Best ov",
  //     tracks: 12,
  //     color: "#ff0000",
  //     favourite: true
  //   },
  //   {
  //     name: "David Bowie: Dimond Dogs",
  //     tracks: 15,
  //     color: "#ff00ff",
  //     favourite: false
  //   }
  // ]

  constructor(@Optional() @Inject("PlaylistsData") playlistsData) {

    this.playlists = playlistsData ? playlistsData : this.playlists;
  }

  savePlaylist(playlist) {
    if (playlist.id) {
      const index = this.playlists.findIndex((elements) => {
        return elements.id === playlist.id;
      });
      this.playlists.splice(index, 1, playlist);
      console.log('saved edited playlist');
    } else {
      playlist.id = Date.now();
      this.playlists.push(playlist);
      console.log('saved new playlist');
    }
  }

  getPlaylists() {
    return this.playlists;
  }

  getPlaylist(id) {
    return this.playlists.find(playlist => playlist.id === id);
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
