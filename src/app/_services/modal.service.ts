import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {
  public modalStatus: Subject<any>;
  constructor() {
    this.modalStatus = new Subject();
  }
  setStatus(status) {
    this.modalStatus.next(status);
  }

}
