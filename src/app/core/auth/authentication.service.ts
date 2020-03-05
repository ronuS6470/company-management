import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from 'src/app/login/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); //loggedIn to check whether user is logged in or not

  /**
   * isLoggedIn variable return observable
   */
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  /**
   * 
   * @param user of type Login Model
   * If username and password exists then navigate to given route
   */
  login(user: Login) {
    if (user.username !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['']);
    }
  }
  /**
   * logout method to navigate login 
   * and also remove existing username from localstorage
   */
  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('username');
    this.router.navigate(['login']);
  }
}
