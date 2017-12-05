import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-new-listing',
  templateUrl: './new-listing.component.html',
  styleUrls: ['./new-listing.component.sass']
})
export class NewListingComponent implements OnInit {
  step = 1;
  @ViewChild('caveDocUpload') caveDoc: ElementRef;
  @ViewChild('coverUpload') cover: ElementRef;
  @Input('listing') listing;
  constructor() { }
  ngOnInit() {
  }

  nextStep(f) {
    console.log('next step', this.step,'form data', f);
    console.log('the listing', this.listing);
    if (this.step < 4) {
      this.step++;
    }
  }
  previousStep(f) {
    console.log('prev step', this.step,'form data', f);
    if (this.step > 1) {
      this.step--;
    }
  }

  submitNewListing(f) {
    if (f.form.status === 'VALID'){
      console.log('form is valid', f);
    } else {
      console.log('form is not valid');
    }
  }
  uploadCover() {
    const cover:any = this.caveDoc.nativeElement;
    const storageRef = firebase.storage().ref();
    storageRef.child('cavedocs/' + this.listing.options + '/covers' + cover.files[0].name).put(cover.files[0]).then( (snapshot) => {
      console.log('snapshot of document', snapshot);
    });
  }

  uploadDoc() {
    const cover:any = this.caveDoc.nativeElement;
    const doc:any = this.caveDoc.nativeElement;
    const storageRef = firebase.storage().ref();
    storageRef.child('cavedocs/' + this.listing.options + '/files' + doc.files[0].name).put(doc.files[0]).then( (snapshot) => {
      console.log('snapshot of document', snapshot);
    });
  }

}
