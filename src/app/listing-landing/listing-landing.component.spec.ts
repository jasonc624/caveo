import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingLandingComponent } from './listing-landing.component';

describe('ListingLandingComponent', () => {
  let component: ListingLandingComponent;
  let fixture: ComponentFixture<ListingLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
