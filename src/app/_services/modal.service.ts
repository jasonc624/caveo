import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {
  public modalStatus: Subject<any>;
  constructor() {
    this.modalStatus = new Subject();
  }
  setStatus(status, options?) {
    if(options) {
      this.modalStatus.next({status: status, options: options});
    } else {
      this.modalStatus.next(status);
    }
  }

}
