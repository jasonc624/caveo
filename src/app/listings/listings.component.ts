import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from "rxjs/Observable";
import {AngularFirestore} from "angularfire2/firestore";

@Component({
  selector: 'ng-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.sass']
})
export class ListingsComponent implements OnInit {
  listings:Observable<any[]>;
  constructor(public db: AngularFirestore, private route: ActivatedRoute, private router:Router) {
    this.listings = db.collection('listings').valueChanges();
  }

  ngOnInit() {
    const address = this.route.snapshot.params['address'];
    // this.firebaseService.getListings(address).subscribe(res => {
    //   if( res.length === 0 ) {
    //     this.router.navigate(['listings',address,'not-found']);
    //   } else {
    //     console.log('getListings', res);
    //     this.listings = res;
    //   }
    // }, err => console.log('listing not found', err));

  }

}
