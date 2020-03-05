/**
 * @author TapasVashi
 */
import { AuthenticateService } from '../authenticate.service';
import { Component } from '@angular/core';
import { Login } from '../login.model';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';

@Component({
  selector: 'cmp-login-container',
  templateUrl: './login.container.html'
})
export class LoginContainer implements OnInit {
  // loginDetails of type observable
  public loginDetails$: Observable<Login[]>;

  constructor(private authService: AuthenticateService) { }

  ngOnInit() {
    this.getAuthDetails();
  }

  /**
   * Api call to get all data from json-server
   */
  private getAuthDetails(): void {
    this.loginDetails$ = this.authService.getAuthDetails();
  }
}
