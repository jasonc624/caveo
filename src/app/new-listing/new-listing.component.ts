import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as firebase from "firebase";
import {AuthService} from "../_services/auth.service";
import {AngularFirestore} from "angularfire2/firestore";
import {ModalService} from "../_services/modal.service";

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

  storageRef = firebase.storage().ref();
  storageBucket;

  docsToUploadArr = [];

  User;

  caveDocCollection;

  form = {
    name: '',
    price: 0,
    type: '',
    coverUrl: '',
    docUrl: '',
    proofUrl: '',
    tou: false,
  };

  constructor(private Auth: AuthService,
              private modalService: ModalService,
              private afs: AngularFirestore) {
    console.log('init new listing modal');

  }

  ngOnInit() {
    this.User = this.Auth.isLoggedIn.getValue();
    this.caveDocCollection = this.afs.collection( 'properties/' + this.listing.options.addressId + '/cavedocs');
    this.storageBucket = 'cavedocs/' + this.listing.options.addressId + '/' + this.User.uid;
  }

  nextStep() {
    if (this.step < 4) {
      this.step++;
    }
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  submitNewListing(form) {
    Object.assign({state: 'complete'}, form);
    this.caveDocCollection.doc(this.listing.options.id).set(form);
    this.modalService.setStatus('closed');
  }

  uploadCover() {
    const cover: any = this.cover.nativeElement;
    if (this.docsToUploadArr.length > 0){
      this.docsToUploadArr.forEach(item => {
        if(item.name == 'cover') {
          firebase.storage().ref().child(item.path).delete();
        }
      });
    }
    this.storageRef.child(this.storageBucket + '/covers/' + cover.files[0].name).put(cover.files[0]).then((snapshot) => {
      this.form.coverUrl = snapshot.downloadURL;
      this.docsToUploadArr.push({name: 'cover', path: snapshot.metadata.fullPath});
      console.log('docs to upload', this.docsToUploadArr);
    });
  }

  uploadDoc() {
    const doc: any = this.caveDoc.nativeElement;
    if (this.docsToUploadArr.length > 0){
      this.docsToUploadArr.forEach(item => {
        if(item.name == 'cover') {
          firebase.storage().ref().child(item.path).delete();
        }
      });
    }
    this.storageRef.child(this.storageBucket + '/docs/' + doc.files[0].name).put(doc.files[0]).then((snapshot) => {
      this.form.docUrl = snapshot.downloadURL;
      this.docsToUploadArr.push({name: 'doc', path: snapshot.metadata.fullPath});
      console.log('docs to upload', this.docsToUploadArr);
    });
  }

  uploadProof() {
    const proof: any = this.proof.nativeElement;
    if (this.docsToUploadArr.length > 0){
      this.docsToUploadArr.forEach(item => {
        if(item.name == 'cover') {
          firebase.storage().ref().child(item.path).delete();
        }
      });
    }
    this.storageRef.child(this.storageBucket + '/proof/' + proof.files[0].name).put(proof.files[0]).then((snapshot) => {
      this.form.proofUrl = snapshot.downloadURL;
      this.docsToUploadArr.push({name: 'proof', path: snapshot.metadata.fullPath});
      console.log('docs to upload', this.docsToUploadArr);
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
      console.log('successfully deleted the entry in db');
      this.modalService.setStatus('closed');
    });
  }

  closeModal() {
    this.cancelUpload();
    this.modalService.setStatus('closed');
  }
}
