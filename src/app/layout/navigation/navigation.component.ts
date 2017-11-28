import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {ModalService} from "../../_services/modal.service";

@Component({
  selector: 'ng-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {
  isLanding = false;
  @Output() purpose: EventEmitter<string> = new EventEmitter<string>();
  constructor(public router: Router, private afAuth: AngularFireAuth, private modalService: ModalService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const route = event.url.slice(1);
        if (route === 'landing') {
          this.isLanding = true;
        } else {
          this.isLanding = false;
        }
        this.afAuth.authState.subscribe(res => {
          console.log('auth state is', res);
        });
      }
    });
  }

  openUserModal(selected) {
    console.log('openUserModal', selected);
    this.modalService.setStatus(selected);
  }
  logout() {
    this.afAuth.auth.signOut()
      .then(res => {
        console.log('signed out', res);
        this.router.navigate(['landing']);
      })
      .catch(err => console.log('something went wrong', err));
  }
}
