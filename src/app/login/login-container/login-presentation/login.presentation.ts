import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
// ---------------------------------- //
import { LoginPresenter } from '../login-presenter/login.presenter';
import { Router } from '@angular/router';
import { Login } from '../../login.model';


@Component({
  selector: 'cmp-login-ui',
  templateUrl: './login.presentation.html',
  styleUrls: ['./login.presentation.scss'],
  viewProviders: [LoginPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginPresentation {

  @Input() public login$: Login[];

  constructor(private service: LoginPresenter, private routes: Router) {}

  authenticate(uname: string, pwd: string){
    const output = this.service.authenticate(uname,pwd,this.login$);
    if(output==true){
      this.routes.navigate(['/company/list'])
    }
    else{
      window.alert('Invalid Username or Password');
    }
  }
}
