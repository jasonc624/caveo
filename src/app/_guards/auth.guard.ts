import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {AuthService} from "../_services/auth.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthGuard implements CanActivate {
  authorized;
  constructor(private afAuth: AngularFireAuth, private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState
      .take(1)
      .map(authState => !!authState)
      .do(authenticated => {
        if (!authenticated) {
          console.log('not authenticated')
          this.router.navigate(['landing']);
        } else {
          return true;
        }
      });
  }

}
