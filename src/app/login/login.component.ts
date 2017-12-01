import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";
import * as firebase from 'firebase/app';
import {Router} from "@angular/router";
import {ModalService} from "../_services/modal.service";
import {AuthService} from "../_services/auth.service";
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
              private auth: AuthService,
              public afAuth: AngularFireAuth,
              private router: Router) {
    this.user = afAuth.authState;
  }

  ngOnInit() {
  }
  login() {
    console.log('login creds', this.email, this.password);
    this.auth.login(this.email, this.password);
    this.modalService.setStatus('closed');
  }

  logout() {
    this.auth.logout();
  }

  register() {
    console.log('reg', this.email, this.password);
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(res => console.log('success you registered', res))
      .catch(err => console.log('something went wrong while registering', err) );
  }
}
