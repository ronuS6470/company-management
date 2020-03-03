import { Component } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';
import { Observable } from 'rxjs';
import { Login } from '../login.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'cmp-login-container',
  templateUrl: './login.container.html'
})
export class LoginContainer implements OnInit {
  public loginDetails$: Observable<Login[]>;

  constructor(private authService: AuthenticateService) {}

  ngOnInit()
  {
      this.getAuthDetails();
  }

  private getAuthDetails(): void
  {
    this.loginDetails$ = this.authService.getAuthDetails();
  }
}
