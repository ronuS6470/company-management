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
export class RegistrationPresentation {

  public userDetails: FormGroup; // Declared FormGroup

  Details: object; // Object to restrict all data entry into json

  // Emit event for post operation on json-server
  @Output() add = new EventEmitter<object>();

  constructor(private registrationService: RegistrationPresenter) {
    this.add = new EventEmitter<Registration>(); // Initialised add event
    this.userDetails = this.registrationService.addUserDetail();
  }

  get f() {
    return this.userDetails.controls;
  }

  /**
   * Registering uname and password into json server
   */
  onSubmit(): void {
    this.Details = {username: this.userDetails.get('username').value, password: this.userDetails.get('password').value };
    this.add.emit(this.Details);
  }
}
