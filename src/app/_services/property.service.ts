import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "angularfire2/firestore";
import {Property} from "../_models/property.model";

@Injectable()
export class PropertyService {
  propertyCollection;
  property;
  propertyDocument: AngularFirestoreDocument<Property>;

  constructor(private afs: AngularFirestore) {
    this.propertyCollection = afs.collection<Property>('properties');
  }

  propertyExists(place) {
    return this.afs.firestore.doc(`properties/${place.place_id}` )
      .get()
      .then(docSnapShot => docSnapShot.exists);
  }

  getProperty(id) {
    this.propertyDocument = this.afs.doc<Property>(`properties/${id}`);
    console.log('what is property id?', id);
    return this.propertyDocument
  }

  createProperty(property) {
    this.propertyCollection.doc(property.place_id).set({
      uid: property.place_id,
      name: property.name,
      formatted_address: property.formatted_address,
      lat: property.geometry.location.lat,
      lng: property.geometry.location.lng,
    })
  }

  updateProperty() {

  }

}
