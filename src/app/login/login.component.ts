import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";
import * as firebase from 'firebase/app';
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  user: Observable<firebase.User>;

  username;
  password;
  constructor(db: AngularFireDatabase,public afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
  }

  ngOnInit() {
  }
  login() {
    console.log('login creds', this.username, this.password);
    this.afAuth.auth.signInWithEmailAndPassword(this.username,this.password)
      .then(res => {
        console.log('success you logged in!', res);
        this.router.navigate(['']);
      })
      .catch(err => console.log('you fucked up buddy', err));
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(res => console.log('you successfully signed out', res))
      .catch(err => console.log('something went wrong', err));
  }

  register() {
    console.log('reg', this.username, this.password);
    this.afAuth.auth.createUserWithEmailAndPassword(this.username, this.password)
      .then(res => console.log('success you registered',res))
      .catch(err => console.log('something went wrong while registering', err) );
  }
}
