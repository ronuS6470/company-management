import { Component } from '@angular/core';

import { CompanyService } from '../company.service';
import { Company } from '../company.model';

@Component({
  selector: 'cmp-company-form-container',
  templateUrl: './company-form.container.html',
  providers:[CompanyService],
  host: { 
    class: 'd-flex h-100 overflow-hidden' 
  },
})
export class CompanyFormContainer {
  constructor(private companyService :CompanyService) {}

  /**
   * add company data
   * @param company acompany object
   */
  public addCompany(company: Company) : void {
    debugger
    this.companyService.addCompanyData(company).subscribe(data => {
      debugger
      if (data) {
        alert('Record Inserted...!!!');
      }
      else
      {
        alert('Not Inserted...!!!');
      }
    });
  }
}
