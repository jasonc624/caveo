import { Component, OnInit } from '@angular/core';
import {ModalService} from "../_services/modal.service";

@Component({
  selector: 'ng-app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.sass']
})
export class SplashComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  openUserModal(selected) {
    this.modalService.setStatus(selected);
  }
}
