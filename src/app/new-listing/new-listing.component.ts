import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as firebase from "firebase";
import {AuthService} from "../_services/auth.service";
import {AngularFirestore} from "angularfire2/firestore";
import {ModalService} from "../_services/modal.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {fileInputValidator} from "../_factories/validators.factory";

@Component({
  selector: 'app-new-listing',
  templateUrl: './new-listing.component.html',
  styleUrls: ['./new-listing.component.sass']
})
export class NewListingComponent implements OnInit {
  step = 1;

  @ViewChild('caveDocUpload') caveDoc: ElementRef;
  @ViewChild('coverUpload') cover: ElementRef;
  @ViewChild('proofUpload') proof: ElementRef;

  @Input('listing') listing;

  storageRef = firebase.storage().ref();
  storageBucket;

  docsToUploadArr = [];

  User;

  caveDocCollection;

  listingForm = new FormGroup({
    'name': new FormControl,
    'price': new FormControl,
    'type': new FormControl,
    'coverUrl': new FormControl([Validators.required]),
    'docUrl': new FormControl([Validators.required]),
    'proofUrl': new FormControl([Validators.required]),
    'tou': new FormControl(),
  });

  constructor(private Auth: AuthService,
              private modalService: ModalService,
              private afs: AngularFirestore) {}

  ngOnInit() {
    this.User = this.Auth.isLoggedIn.getValue();
    this.caveDocCollection = this.afs.collection( 'properties/' + this.listing.options.addressId + '/cavedocs');
    this.storageBucket = 'cavedocs/' + this.listing.options.addressId + '/' + this.User.uid;
    console.log('the user!!!', this.User);
  }

  nextStep() {
    console.log('isloggedin', this.User);
    if (this.step < 4) {
      this.step++;
    }
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  submitNewListing() {
    const form = Object.assign( this.listingForm.value, {user: this.User.uid});
    this.caveDocCollection.doc(this.listing.options.id).set(form);
    console.log('the listing form value',form);
    this.modalService.setStatus('closed');
  }

  uploadCover($event) {
    const cover: any = this.cover.nativeElement;
    console.log('what is the new cover?', cover);
    if (this.docsToUploadArr.length > 0){
      this.docsToUploadArr.forEach(item => {
        if(item.name == 'cover') {
          firebase.storage().ref().child(item.path).delete();
        }
      });
    }
    this.storageRef.child(this.storageBucket + '/covers/' + cover.files[0].name).put(cover.files[0]).then((snapshot) => {
      this.listingForm.controls['coverUrl'].setValue(snapshot.downloadURL);
      this.docsToUploadArr.push({name: 'cover', path: snapshot.metadata.fullPath});
    });
  }

  uploadDoc() {
    const doc: any = this.caveDoc.nativeElement;
    if (this.docsToUploadArr.length > 0){
      this.docsToUploadArr.forEach(item => {
        if(item.name == 'doc') {
          firebase.storage().ref().child(item.path).delete();
        }
      });
    }
    this.storageRef.child(this.storageBucket + '/docs/' + doc.files[0].name).put(doc.files[0]).then((snapshot) => {
      this.listingForm.controls['docUrl'].setValue(snapshot.downloadURL);
      this.docsToUploadArr.push({name: 'doc', path: snapshot.metadata.fullPath});
    });
  }

  uploadProof() {
    const proof: any = this.proof.nativeElement;
    if (this.docsToUploadArr.length > 0){
      this.docsToUploadArr.forEach(item => {
        if(item.name == 'proof') {
          firebase.storage().ref().child(item.path).delete();
        }
      });
    }
    this.storageRef.child(this.storageBucket + '/proof/' + proof.files[0].name).put(proof.files[0]).then((snapshot) => {
      this.listingForm.controls['proofUrl'].setValue(snapshot.downloadURL);
      this.docsToUploadArr.push({name: 'proof', path: snapshot.metadata.fullPath});
    });
  }

  cancelUpload() {
    const storageRef = firebase.storage().ref();
    this.docsToUploadArr.forEach(item => {
      storageRef.child(item.path).delete()
        .then(res => {
          console.log('success deleting files', res)
        })
        .catch(err => console.log('err deleting files', err));
    });
    this.caveDocCollection.doc(this.listing.options.id).delete().then(res => {
      this.modalService.setStatus('closed');
    });
  }

  closeModal() {
    this.cancelUpload();
    this.modalService.setStatus('closed');
  }

  get coverUrl() { return this.listingForm.get('coverUrl') }
}
