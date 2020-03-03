/**
 * @author TapasVashi
 */
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

  // Input property of login
  @Input() public login$: Login[]; 

  model: Login[]; //model Login of type array

  constructor(private service: LoginPresenter, private routes: Router) {}

  /**
   * 
   * @param username function parameter of username
   * @param password function parameter of password
   */
  authenticate(username: string, password: string){
    const output = this.service.authenticate(username, password, this.login$);
    if(output == true){                           // If service returns true, then navigate
      this.routes.navigate(['/company/list'])
    }
    else{                                         // Else, return an alert box
      window.alert('Invalid Username or Password');
    }
  }
}
