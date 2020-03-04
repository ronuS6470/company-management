import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginContainer } from './login-container/login.container';
import { RegistrationContainer } from '../registration/registration-container/registration.container';
import { RegistrationModule } from '../registration/registration.module';


const routes: Routes = [
  {
    path: '',
    component: LoginContainer
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }