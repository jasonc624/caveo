import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from "rxjs/Observable";
import {AngularFirestore} from "angularfire2/firestore";
import {PropertyService} from "../_services/property.service";
import {Property} from "../_models/property.model";

@Component({
  selector: 'ng-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.sass']
})
export class ListingsComponent implements OnInit {
  property:Observable<Property>;
  constructor(private route: ActivatedRoute,
              private propertyService: PropertyService) {

  }

  ngOnInit() {
    const address = this.route.snapshot.params['address'];
    this.property = this.propertyService.getProperty(address).valueChanges();
    console.log('the property', this.property);
  }

}
