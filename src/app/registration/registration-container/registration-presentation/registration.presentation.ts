import { Component, ChangeDetectionStrategy, Output, Input } from '@angular/core';
// ---------------------------------- //
import { RegistrationPresenter } from '../registration-presenter/registration.presenter';
import { EventEmitter } from '@angular/core';
import { Registration } from '../../registration.model';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'cmp-registration-ui',
  templateUrl: './registration.presentation.html',
  styleUrls: ['./registration.presentation.scss'],
  viewProviders: [RegistrationPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationPresentation  {

  public userDetails: FormGroup;

  @Output() add = new EventEmitter<Registration>();
  
  constructor(private registrationService: RegistrationPresenter) {
    this.add = new EventEmitter<Registration>();
    this.userDetails = this.registrationService.addUserDetail();
  }

  get f()
  {
    return this.userDetails.controls;
  }

  onSubmit(): void{
    this.add.emit(this.userDetails.value);
  }
}