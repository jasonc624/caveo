import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";
import {ActivatedRoute} from "@angular/router";
import {Cavedoc} from "../_models/cavedoc.model";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'ng-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.sass']
})
export class ListingsComponent implements OnInit {
  sub;
  address;
  listings: Observable<any>;
  constructor(private afs: AngularFirestore,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.address = params['address'];
      this.listings = this.afs.doc<Cavedoc>(`properties/${this.address}`).collection('cavedocs').valueChanges();
    });
  }

}
