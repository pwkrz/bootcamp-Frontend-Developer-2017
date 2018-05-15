import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

import { MusicSearchService } from '../music-search.service';

@Component({
  selector: 'album-search-form',
  template: `
  <form [formGroup]='searchForm' class="my-4">
    <div class="input-group mb-3">
      <label class="sr-only" for="formInput">Search</label>
      <input formControlName="query"
            type="search" class="form-control form-control-lg" id="formInput" placeholder="start typing..."
            aria-label="start typing..." aria-describedby="basic-addon2">
    </div>
  </form>
  `,
  styles: []
})
export class AlbumSearchFormComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private musicSearch: MusicSearchService) {

    this.searchForm = new FormGroup({
      'query': new FormControl('')
    })
    this.searchForm.get('query').valueChanges
      .filter( query => query.length > 2 )
      .distinctUntilChanged()
      .debounceTime(400)
      .subscribe(query => {
        this.musicSearch.search(query);
      })
  }

  ngOnInit() {
  }

  search(query){
    this.musicSearch.search(query);
  }
}
