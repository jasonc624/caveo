import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as firebase from "firebase";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-new-listing',
  templateUrl: './new-listing.component.html',
  styleUrls: ['./new-listing.component.sass']
})
export class NewListingComponent implements OnInit {
  step = 1;
  formReady = false;

  @ViewChild('caveDocUpload') caveDoc: ElementRef;
  @ViewChild('coverUpload') cover: ElementRef;
  @ViewChild('proofUpload') proof: ElementRef;
  @Input('listing') listing;

  coverFileUrl;
  cavedocFileUrl;
  proofFileUrl;

  storageRef = firebase.storage().ref();

  User;
  constructor(private Auth:AuthService) { }
  ngOnInit() {
    this.User = this.Auth.isLoggedIn.getValue();
  }

  nextStep(f) {
    console.log('current step', this.step,'form data', f);
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
    console.log('submitting the form', f);
    if (this.formReady) {

    }

    // this.uploadDoc().then(res => {
    //   this.uploadProof();
    //   console.log('done with first promise');
    // });
    // this.uploadCover().then(res => {
    //   console.log('done with second promise');
    //   if (f.form.status === 'VALID'){
    //     console.log('form valid',f);
    //     f.value.coverUrl = this.coverFileUrl;
    //     f.value.docUrl = this.cavedocFileUrl;
    //     f.value.proofUrl = this.proofFileUrl;
    //   }
    // })
  }
  uploadCover() {
    const promise = new Promise((resolve, reject) => {
      const cover:any = this.cover.nativeElement;
      this.storageRef.child('cavedocs/' + this.listing.options + '/' + this.User.uid + '/covers/' + cover.files[0].name).put(cover.files[0]).then( (snapshot) => {
        this.coverFileUrl = snapshot.downloadURL;
        console.log('done uploading cover');
        resolve()
      });
    });
    return promise;
  }

  uploadDoc() {
    const promise = new Promise((resolve, reject) => {
      const doc:any = this.caveDoc.nativeElement;
      this.storageRef.child('cavedocs/' + this.listing.options + '/' + this.User.uid + '/docs/' + doc.files[0].name).put(doc.files[0]).then( (snapshot) => {
        this.cavedocFileUrl = snapshot.downloadURL;
        console.log('done uploading doc');
        resolve();
      });
    });
    return promise;
  }

  uploadProof() {
    const promise = new Promise((resolve, reject)=> {
      const proof:any = this.proof.nativeElement;
      this.storageRef.child('cavedocs/' + this.listing.options + '/' + this.User.uid + '/proof/' + proof.files[0].name).put(proof.files[0]).then( (snapshot) => {
        this.proofFileUrl = snapshot.downloadURL;
        console.log('done uploading proof');
        resolve();
      });
    });
    return promise
  }

  cancelUpload() {
    const storageRef = firebase.storage().ref();
    // storageRef.child(`${this.basePath}/${name}`).delete()
  }

}
