import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-listing-not-found',
  templateUrl: './listing-not-found.component.html',
  styleUrls: ['./listing-not-found.component.sass']
})
export class ListingNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('listing not found');
  }
}
