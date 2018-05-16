import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer-bar',
  template: `
    <nav class="navbar text-light navbar-dark bg-dark fixed-bottom">
      <div class="container justify-content-end">
        <playlist-selector></playlist-selector>
      </div>
    </nav>
  `,
  styles: []
})
export class FooterBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
