import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { AuthService } from '../auth.service';

@Injectable()
export class MusicSearchService {

  albums;

  albumStream = new Subject();

  constructor(private http: Http, private auth: AuthService) {
    this.search("sun ra");
  }

  getAlbumStream(){
    return this.albumStream.asObservable().startWith(this.albums);
  }

  getAlbum(id){
    let url = `https://api.spotify.com/v1/albums/${id}`;
    
    return this.http.get(url).map( (resp: Response) => resp.json() )
  }

  search(query){
    this.http
        .get(`https://api.spotify.com/v1/search?q=${ query }&type=album`)
        .map((resp: Response) => {
          let data = resp.json();
          let albums = data.albums.items.map( album => { return {name: album.name, href: album.href, id: album.id, images: album.images} } );

          return albums;
        })
        .do( albums => this.albums = albums )
        .subscribe( albums => { this.albumStream.next(albums) }
        , error => {
          if (error.status == 401) {
            this.auth.authorize();
          } else {
            console.log(error)
          }
        });
  }
}
