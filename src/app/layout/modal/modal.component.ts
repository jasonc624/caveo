import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../_services/modal.service';

@Component({
  selector: 'ng-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  @Input('purpose') purpose;
  constructor(public modalService: ModalService) {
  }

  ngOnInit() {
  }
  closeModal() {
     this.modalService.setStatus('closed');
  }
}
