import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AngularFireAuth, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.authState.map(auth => {
      if (auth == null || auth == undefined) {
        this.router.navigate(['landing']);
        return false;
      } else {
        this.router.navigate(['']);
        return true;
      }
    });
  }
}
