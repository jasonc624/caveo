import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {ModalService} from "../../_services/modal.service";
import {AuthService} from "../../_services/auth.service";
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {AngularFirestore, AngularFirestoreDocument} from "angularfire2/firestore";
import {User} from "../../_models/user.model";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'ng-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {
  @ViewChild('avatarUpload') avatar: ElementRef;
  User;

  @Input('landing') isLanding;

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  open = true;
  constructor(public router: Router, public auth: AuthService, private modalService: ModalService, private afs: AngularFirestore) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.User = user;
      } else {
        // No user is signed in.
        this.User = null;
      }
    });
  }

  ngOnInit() {
    this.change.emit(this.open);
  }

  openUserModal(selected) {
    this.modalService.setStatus(selected);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['landing']);
  }

  uploadAvatar() {
    const el:any = this.avatar.nativeElement;
    const storageRef = firebase.storage().ref();
    storageRef.child('avatars/' + el.files[0].name).put(el.files[0]).then( (snapshot) => {
      this.auth.updateUserData(this.User.uid,{photoURL: snapshot.downloadURL});
    });

  }

  openMenu() {
    this.open = !this.open;
    this.change.emit(this.open);
  }
}
