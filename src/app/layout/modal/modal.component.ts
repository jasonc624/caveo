import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../_services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  @Input() purpose;
  constructor(public modalService: ModalService) {
  }

  ngOnInit() {
  }
  closeModal() {
     this.modalService.setStatus('closed');
  }
}
