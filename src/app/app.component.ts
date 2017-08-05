import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {ModalService} from './_services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  isLanding = false;
  showModal = 'closed';

  constructor(public router: Router, public modalService: ModalService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const route = event.url.slice(1);
        if (route === 'landing') {
          this.isLanding = true;
        }
      }
    });
  }

  modalPurpose(event, content) {
    this.showModal = event;
  }
}



















