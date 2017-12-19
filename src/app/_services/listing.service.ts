import {Injectable} from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";

@Injectable()
export class ListingService {
  listingDoc;
  constructor(private afs: AngularFirestore) {
  }
  getListing(property, id) {
    this.listingDoc = this.afs.doc<any>(`properties/${property}/cavedocs/${id}`);
    return this.listingDoc

  }

}
