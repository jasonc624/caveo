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

  constructor(private Auth: AuthService,
              private modalService: ModalService,
              private afs: AngularFirestore) {
    console.log('init new listing modal');
    //TODO: delete unfinished listings on page refresh

  }

  ngOnInit() {
    this.User = this.Auth.isLoggedIn.getValue();
    this.caveDocCollection = this.afs.collection( 'properties/' + this.listing.options.addressId + '/cavedocs');
    this.storageBucket = 'cavedocs/' + this.listing.options.addressId + '/' + this.User.uid;
    window.onbeforeunload = (evt) => {
      console.log('reloading the page!',evt);
    }
  }

  nextStep(f) {
    console.log('current step', this.step, 'form data', f, ' the listing', this.listing);
    if (this.step < 4) {
      this.step++;
    }
  }

  previousStep(f) {
    console.log('prev step', this.step, 'form data', f);
    if (this.step > 1) {
      this.step--;
    }
  }

  submitNewListing(f) {
    Object.assign({state: 'complete'}, f.form.value);
    console.log('submitting the form', f.form.value);
    this.caveDocCollection.doc(this.listing.options.id).update(f.form.value);
    if (f.form.valid === 'VALID') {
      console.log('form is valid submitted');
    } else {
      console.log('form invalid');
    }
    this.modalService.setStatus('closed');
  }

  uploadCover(f) {
    const cover: any = this.cover.nativeElement;
    this.storageRef.child(this.storageBucket + '/covers/' + cover.files[0].name).put(cover.files[0]).then((snapshot) => {
      f.form.value.coverUrl = snapshot.downloadURL;
      this.docsToUploadArr.push(snapshot.metadata.fullPath);
      console.log('form has cover url?', f);
    });
  }

  uploadDoc(f) {
    const doc: any = this.caveDoc.nativeElement;
    this.storageRef.child(this.storageBucket + '/docs/' + doc.files[0].name).put(doc.files[0]).then((snapshot) => {
      f.form.value.docUrl = snapshot.downloadURL;
      this.docsToUploadArr.push(snapshot.metadata.fullPath);
      console.log('done uploading cover', this.docsToUploadArr);
    });
  }

  uploadProof(f) {
    const proof: any = this.proof.nativeElement;
    this.storageRef.child(this.storageBucket + '/proof/' + proof.files[0].name).put(proof.files[0]).then((snapshot) => {
      f.form.value.proofUrl = snapshot.downloadURL;
      this.docsToUploadArr.push(snapshot.metadata.fullPath);
      console.log('done uploading cover', this.docsToUploadArr);
    });
  }

  cancelUpload() {
    const storageRef = firebase.storage().ref();
    this.docsToUploadArr.forEach(item => {
      storageRef.child(item).delete()
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
