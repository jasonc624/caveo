import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Property} from "../_models/property.model";
import {PropertyService} from "../_services/property.service";
import {ActivatedRoute} from "@angular/router";
import {ModalService} from "../_services/modal.service";
import {AngularFirestore} from "angularfire2/firestore";

@Component({
  selector: 'app-property-landing',
  templateUrl: './property-landing.component.html',
  styleUrls: ['./property-landing.component.sass']
})
export class PropertyLandingComponent implements OnInit {
  sub;
  address:string;
  property:Observable<Property>;
  propertyCollection;
  cavedocCollection;
  constructor(private route: ActivatedRoute,
              private afs:  AngularFirestore,
              private propertyService: PropertyService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.address = params['address'];
      this.property = this.propertyService.getProperty(this.address).valueChanges();
    });

  }
  addDoc() {
    this.propertyCollection = this.afs.doc('' + `properties/${this.address}`);
    this.cavedocCollection = this.propertyCollection.collection('cavedoc');
    this.cavedocCollection.doc().set({
      uid: "testing mother fucker"
    });
    this.modalService.setStatus('newListing', this.address);
  }
  editDoc() {

  }

}
