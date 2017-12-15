import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.sass']
})
export class ListingComponent implements OnInit {
  @Input('listing') listing;
  constructor() {
    console.log('the listing component', this.listing);
  }

  ngOnInit() {

  }

}
