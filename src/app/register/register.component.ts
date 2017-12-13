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
    display_name:'',
    full_name: '',
    city: '',
    state: '',
    zip: '',
    avatar:'',
    phone:''
  };
  constructor(private auth: AuthService,
              private modalService: ModalService) { }
  ngOnInit() {
  }
  register(user) {
    this.auth.register(user.email, user.password, this.user);
    this.modalService.setStatus('closed');
    this.modalService.setStatus('login');
  }
  closeModal() {
    this.modalService.setStatus('closed');
  }

}
