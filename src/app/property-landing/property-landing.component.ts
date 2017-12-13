import {Component, OnInit} from '@angular/core';
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
  address: string;
  property: Observable<Property>;

  constructor(private route: ActivatedRoute,
              private afs: AngularFirestore,
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
    // const docRef = this.afs.collection('properties').doc(this.address);
    // const queryObservable = docRef.collection('cavedocs', ref => ref.where('state', '==', 'in progress')).valueChanges();

    // subscribe to changes
    // queryObservable.subscribe((queriedItems:any) => {
    //   console.log('queried items', queriedItems);
    //   queriedItems.forEach(item => {
    //     console.log('item', item);
    //     docRef.collection('cavedocs').doc(item.id).delete().then(res => {
    //       console.log('deleted unfinished listings');
    //     });
    //   });
    // });
    const id = this.afs.createId();
    const docInstance = {id, addressId: this.address, state: 'in progress'};
    // this.propertyCollection = this.afs.collection( 'properties/' + this.address + '/cavedocs');
    // this.propertyCollection.doc(docInstance.id).set(docInstance);
    this.modalService.setStatus('newListing', docInstance);

  }

}
