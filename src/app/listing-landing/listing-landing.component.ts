import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ListingService} from "../_services/listing.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-listing-landing',
  templateUrl: './listing-landing.component.html',
  styleUrls: ['./listing-landing.component.sass']
})
export class ListingLandingComponent implements OnInit {
  sub;
  listing: Observable<any>;
  constructor(private route: ActivatedRoute,
              private listingService: ListingService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      const property = params['address'];
      this.listing = this.listingService.getListing(property, id).valueChanges();
    });
  }

}
