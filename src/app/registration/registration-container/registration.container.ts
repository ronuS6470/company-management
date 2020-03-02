import { Component } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import { Registration } from '../registration.model';

@Component({
  selector: 'cmp-registration-container',
  templateUrl: './registration.container.html'
})
export class RegistrationContainer {
  constructor(private registrationService: RegistrationService, private route: Router) { }

  addDetail(userDetailForm: Registration): void {
    this.registrationService.addUser(userDetailForm).subscribe(() => {
      this.route.navigate(['/login']);
    })
  }
}