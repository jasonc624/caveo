import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Property} from "../_models/property.model";
import {PropertyService} from "../_services/property.service";
import {ActivatedRoute} from "@angular/router";
import {ModalService} from "../_services/modal.service";

@Component({
  selector: 'app-property-landing',
  templateUrl: './property-landing.component.html',
  styleUrls: ['./property-landing.component.sass']
})
export class PropertyLandingComponent implements OnInit {
  sub;
  address:string;
  property:Observable<Property>;
  constructor(private route: ActivatedRoute,
              private propertyService: PropertyService,
              private modalService: ModalService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.address = params['address'];
      this.property = this.propertyService.getProperty(this.address).valueChanges();
    });

  }
  addDoc() {
    this.modalService.setStatus('newListing', this.address);
  }
  editDoc() {

  }

}
