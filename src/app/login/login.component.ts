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
  email;
  password;
  constructor(private modalService: ModalService,
              private auth: AuthService) {
  }

  ngOnInit() {
  }
  login() {
    this.auth.login(this.email, this.password);
    this.modalService.setStatus('closed');
  }
  closeModal() {
    this.modalService.setStatus('closed');
  }
}
