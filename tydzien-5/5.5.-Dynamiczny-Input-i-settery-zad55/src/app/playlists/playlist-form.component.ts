import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'playlist-form',
  template: `
        <form (submit)="$event.preventDefault(); save(edited)">
          <div class="form-group">
            <label>Nazwa:</label>
            <input type="text" [(ngModel)]="edited.name" class="form-control" name="name">
          </div>
          <div class="form-group">
            <label>Utwory:</label>
            <input type="text" [value]="edited.tracks + ' utwory'" disabled class="form-control" name="tracks">
          </div>
          <div class="form-group">
            <label>Kolor:</label>
            <input name="color" type="color" [(ngModel)]="edited.color" (keydown)="$event.preventDefault(); save(edited)">
          </div>
          <div class="form-group">
            <label><input name="favourite" type="checkbox" [(ngModel)]="edited.favourite"> 
            Ulubiona</label>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-success float-xs-right">Zapisz</button>
          </div>
        </form>
  `,
  styles: []
})
export class PlaylistFormComponent implements OnInit {
  
  @Input("playlist")
  set editedSetter(playlist){
    if(playlist) this.edited = Object.assign( {}, playlist )
  }

  edited;

  @Output('saved')
  onSave = new EventEmitter();

  save(edited){
    this.onSave.emit(edited)
  }

  constructor() { }

  ngOnInit() {
  }

}
