import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'nav-bar',
  template: `
    <nav class="navbar navbar-dark bg-dark">
      <div class="container py-2">
        <a class="navbar-brand" routerLink="">{{ title }}</a>
        <div class="expand navbar-expand">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/search" routerLinkActive="active">Search albums</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/playlists" routerLinkActive="active">Your playlists</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavBarComponent implements OnInit {

  @Input()
  title;
  constructor() { }

  ngOnInit() {
  }

}
