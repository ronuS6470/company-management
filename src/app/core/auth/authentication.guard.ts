import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable} from 'rxjs';
import { AuthenticationService } from './authentication.service';
import {take,map} from 'rxjs/operators'

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): Observable<boolean> {
    /**
     * if not logged in redirect to login page and return false
     * else return true 
     */
    return this.authService.isLoggedIn.pipe(
      take(1), 
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['login']);  //navigate to login page
          return false;
        }
        return true;
      })
    );
  }
  
}
