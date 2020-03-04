import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from 'src/app/login/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login(user: Login) {
    if (user.username !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('username');
    this.router.navigate(['login']);
  }
}
