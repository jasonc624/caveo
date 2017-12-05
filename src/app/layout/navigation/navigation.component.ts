import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
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
  isLanding = false;
  Uid = localStorage.getItem('uid');
  @ViewChild('avatarUpload') avatar: ElementRef;
  @Output() purpose: EventEmitter<string> = new EventEmitter<string>();

  private userDoc: AngularFirestoreDocument<User>;
  user: Observable<User>;
  constructor(public router: Router, public auth: AuthService, private modalService: ModalService, private afs: AngularFirestore) {
    this.userDoc = afs.doc<User>('users/' + this.Uid);
    this.user = this.userDoc.valueChanges();
    // console.log("the user", this.user);
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const route = event.url.slice(1);
        if (route === 'landing') {
          this.isLanding = true;
        } else {
          this.isLanding = false;
        }
      }
    });
  }

  openUserModal(selected) {
    console.log('openUserModal', selected);
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
      this.auth.updateUserData(this.Uid,{avatar: snapshot.downloadURL});
    });

  }
}
