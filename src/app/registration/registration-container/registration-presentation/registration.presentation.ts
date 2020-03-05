/**
 * @author TapasVashi
 */
import { Component, ChangeDetectionStrategy, Output, Input } from '@angular/core';

import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegistrationPresenter } from '../registration-presenter/registration.presenter';
import { Registration } from '../../registration.model';


@Component({
  selector: 'cmp-registration-ui',
  templateUrl: './registration.presentation.html',
  styleUrls: ['./registration.presentation.scss'],
  viewProviders: [RegistrationPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationPresentation {

  public userDetails: FormGroup; // Declared FormGroup

  public Details: object; // Object to restrict all data entry into json

  // Emit event for post operation on json-server
  @Output() add: EventEmitter<object>;

  constructor(private registrationService: RegistrationPresenter) {
    this.add = new EventEmitter<Registration>(); // Initialised add event for new object
    this.userDetails = this.registrationService.addUserDetail(); // Initialised add event for userDetail object
  }

  /**
   * Function to return formcontrols
   */
  get formControls() {
    return this.userDetails.controls;
  }

  /**
   * Registering uname and password into json server
   */
  public onSubmit(): void {
    this.Details = { username: this.userDetails.get('username').value, password: this.userDetails.get('password').value };
    this.add.emit(this.Details);
  }
}
