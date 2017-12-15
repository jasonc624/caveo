import { Component, OnInit } from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";
import {ModalService} from "../_services/modal.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  public user = {
    email: '',
    password: '',
    displayName:'',
    fullName: '',
    phoneNumber:'',
    city: '',
    state: '',
    zip: ''
  };
  constructor(private auth: AuthService,
              private modalService: ModalService) { }
  ngOnInit() {
  }
  register(user) {
    console.log('nani??', user);
    this.auth.register(user);
  }
  closeModal() {
    this.modalService.setStatus('closed');
  }

}
