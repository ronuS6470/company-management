import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginContainer } from './login-container/login.container';
import { LoginPresentation } from './login-container/login-presentation/login.presentation';
import { Login } from './login.model';


@NgModule({
  declarations: [
    LoginContainer,
    LoginPresentation
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
  exports:
  [Login]
})
export class LoginModule { }
