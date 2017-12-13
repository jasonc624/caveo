import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "angularfire2/firestore";
import {Property} from "../_models/property.model";

@Injectable()
export class PropertyService {
  propImg = 'https://firebasestorage.googleapis.com/v0/b/caveo-41efd.appspot.com/o/property_assets%2FChIJ9dvJ-s9-54gRL9V57gU_nSY%2Fdefault-home.png?alt=media&token=907465e7-4be7-4bfe-a4b5-69798142a744'
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
    return this.propertyDocument
  }

  createProperty(property) {
    this.propertyCollection.doc(property.place_id).set({
      uid: property.place_id,
      name: property.name,
      property_image: this.propImg,
      formatted_address: property.formatted_address,
      lat: property.geometry.location.lat,
      lng: property.geometry.location.lng,
    })
  }

  updateProperty() {

  }

}
