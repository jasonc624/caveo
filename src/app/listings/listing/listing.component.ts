import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../_models/user.model";
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.sass']
})
export class ListingComponent implements OnInit {
  @Input('listing') listing;
  user: Observable<any>;
  constructor(private afs: AngularFirestore) {
  }

  ngOnInit() {
    console.log('the listing', this.listing);
    this.user = this.afs.doc<User>(`users/${this.listing.user}`).valueChanges();
  }

}
