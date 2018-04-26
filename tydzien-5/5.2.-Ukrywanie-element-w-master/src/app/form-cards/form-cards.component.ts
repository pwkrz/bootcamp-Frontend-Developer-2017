import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'form-cards',
  templateUrl: "form-cards.component.html",
  styles: []
})
export class FormCardsComponent implements OnInit {

  card1Hidden = false;
  card2Hidden = false;

  constructor() {  }

  ngOnInit() {
  }

}
