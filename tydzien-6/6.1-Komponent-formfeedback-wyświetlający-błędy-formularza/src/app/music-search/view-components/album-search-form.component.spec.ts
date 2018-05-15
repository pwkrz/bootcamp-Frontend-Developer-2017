import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumSearchFormComponent } from './album-search-form.component';

describe('AlbumSearchFormComponent', () => {
  let component: AlbumSearchFormComponent;
  let fixture: ComponentFixture<AlbumSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
