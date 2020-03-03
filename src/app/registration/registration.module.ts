import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationContainer } from './registration-container/registration.container';
import { RegistrationPresentation } from './registration-container/registration-presentation/registration.presentation';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationService } from './registration.service';


@NgModule({
  declarations: [
    RegistrationContainer,
    RegistrationPresentation
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [RegistrationService]
})
export class RegistrationModule { }
