import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class FirebaseService {
  listings:FirebaseListObservable<any[]>;

  constructor(private af: AngularFireDatabase, public afAuth: AngularFireAuth) { }

  getListings(address) {
    this.listings = this.af.list(`/listings/${address}`) as FirebaseListObservable<Listing[]>;
    return this.listings;
  }

}

interface Listing {
  $key?: string;
  title?: string;
  image?: string;
  type?: string;
  city?: string;
  state?: string;
  address?: string;
  price?: number;
  owner?: string;

}
