import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {
  isLanding = false;
  constructor(public router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const route = event.url.slice(1);
        if (route === 'landing') {
          this.isLanding = true;
        } else {
          this.isLanding = false;
        }
      }
    });
  }

}
