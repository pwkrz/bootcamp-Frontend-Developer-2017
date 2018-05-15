import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'content-card',
  template: `
  <div class="card">
    <div class="card-body">
      <ng-content></ng-content>
    </div>
  </div>
  `,
  styles: []
})
export class ContentCardComponent implements OnInit {

  @Input()
  title;

  @Input("text")
  description;

  constructor() { }

  ngOnInit() {
  }

}
