import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";
import * as firebase from 'firebase/app';
import {Router} from "@angular/router";
import {ModalService} from "../_services/modal.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  user: Observable<firebase.User>;

  email;
  password;
  constructor(private modalService: ModalService,
              public afAuth: AngularFireAuth,
              private router: Router) {
    this.user = afAuth.authState;
  }

  ngOnInit() {
  }
  login() {
    console.log('login creds', this.email, this.password);
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(res => {
        console.log('success you logged in!', res);
        this.modalService.setStatus('closed');
        this.router.navigate(['']);
        console.log('authstate after logging in', this.user);
      })
      .catch(err => console.log('you fucked up buddy', err));
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(res => console.log('you successfully signed out', res))
      .catch(err => console.log('something went wrong', err));
  }

  register() {
    console.log('reg', this.email, this.password);
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(res => console.log('success you registered', res))
      .catch(err => console.log('something went wrong while registering', err) );
  }
}
