import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../_services/firebase.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.sass']
})
export class ListingsComponent implements OnInit {
  listings:any;
  constructor(public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getListings().subscribe(res => {
      console.log('getListings', res);
      this.listings = res;
    })
  }

}
