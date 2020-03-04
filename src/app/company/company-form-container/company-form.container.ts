import { Component } from '@angular/core';

@Component({
  selector: 'cmp-company-form-container',
  templateUrl: './company-form.container.html',
  host: { 
    class: 'd-flex h-100 overflow-hidden' 
  },
})
export class CompanyFormContainer {
  constructor() {}
}
