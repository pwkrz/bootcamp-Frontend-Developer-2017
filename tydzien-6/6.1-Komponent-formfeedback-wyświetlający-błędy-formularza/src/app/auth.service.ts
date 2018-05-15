import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { spotifyAuth } from "../environments/spotify.auth"

@Injectable()
export class AuthService {

  constructor(private baseOptions: RequestOptions) { }

  getToken() {
    let token = localStorage.getItem('token');

    if (!token) {
      const match = window.location.hash.match(/#access_token=(.*?)&/);

      token = match && match[1];

      localStorage.setItem('token', token);

      window.location.hash = "";
    }

    if (!token) {
      this.authorize();
    }

    this.baseOptions.headers.set('Authorization', 'Bearer ' + token);

    return token;
  }

  authorize() {
    let authUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyAuth.client_id}&response_type=token&redirect_uri=http://localhost:4200/search`;

    localStorage.removeItem('token');
    window.location.replace(authUrl);
  }
}
