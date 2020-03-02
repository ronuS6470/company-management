import { Component } from '@angular/core';

import { CompanyService } from '../company.service';
import { Company } from '../company.model';

@Component({
  selector: 'cmp-company-form-container',
  templateUrl: './company-form.container.html',
  providers: [CompanyService]
})
export class CompanyFormContainer {
  constructor(private companyService: CompanyService) { }

  /**
   * add company data
   * @param company acompany object
   */
  public addCompany(company: Company): void {
    this.companyService.addCompanyData(company).subscribe(data => {
      if (data) {
        alert('Record Inserted...!!!');
      } else {
        alert('Not Inserted...!!!');
      }
    });
  }
}
