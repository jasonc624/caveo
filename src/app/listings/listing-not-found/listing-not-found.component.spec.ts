import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingNotFoundComponent } from './listing-not-found.component';

describe('ListingNotFoundComponent', () => {
  let component: ListingNotFoundComponent;
  let fixture: ComponentFixture<ListingNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
