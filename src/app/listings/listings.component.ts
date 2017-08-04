import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../_services/firebase.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.sass']
})
export class ListingsComponent implements OnInit {
  listings:any;
  constructor(public firebaseService: FirebaseService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    const address = this.route.snapshot.params['address'];
    this.firebaseService.getListings(address).subscribe(res => {
      if( res.length === 0 ) {
        this.router.navigate(['listings',address,'not-found']);
      } else {
        console.log('getListings', res);
        this.listings = res;
      }
    }, err => console.log('listing not found', err));
  }

}
