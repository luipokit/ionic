import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { logging } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // must this constructor to user router
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
      
      // const loggedIn = Math.random() > 0.5 ? true : false;
      const loggedIn = true;

      if (!loggedIn) {
        this.router.navigate(['/']);
        return loggedIn;
      }
    
      return loggedIn;
  }
}
