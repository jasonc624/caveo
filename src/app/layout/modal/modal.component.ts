import { Component, OnInit } from '@angular/core';
import {ModalService} from "../../_services/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  modalContent;
  constructor(public modalService: ModalService) {
    this.modalService.modalStatus.subscribe(res => {
      this.modalContent = res;
    });
  }

  ngOnInit() {
  }

}
