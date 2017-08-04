import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../_services/firebase.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.sass']
})
export class ListingsComponent implements OnInit {
  listings:any;
  constructor(public firebaseService: FirebaseService, private route: ActivatedRoute) { }

  ngOnInit() {
    const address = this.route.snapshot.params['address'];
    this.firebaseService.getListings(address).subscribe(res => {
      console.log('getListings', res);
      this.listings = res;
    })
  }

}
