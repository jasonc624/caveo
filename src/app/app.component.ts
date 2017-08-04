import {Component, OnInit} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  people: FirebaseListObservable<any[]>;
  user: Observable<firebase.User>;

  username;
  password;
 	constructor(db: AngularFireDatabase,public afAuth: AngularFireAuth) {
 	  this.people = db.list('/people');
    this.user = afAuth.authState;
  }
  ngOnInit() {
 	  console.log('the people', this.people);
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  register() {
 	  this.afAuth.auth.createUserWithEmailAndPassword(this.username, this.password);
  }
}






















