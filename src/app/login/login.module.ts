import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginContainer } from './login-container/login.container';
import { LoginPresentation } from './login-container/login-presentation/login.presentation';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticateService } from './authenticate.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginContainer,
    LoginPresentation
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthenticateService
  ]
})
export class LoginModule { }
