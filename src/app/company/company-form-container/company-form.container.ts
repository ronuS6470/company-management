import { Component, OnInit } from '@angular/core';

import { CompanyService } from '../company.service';
import { Company } from '../company.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'cmp-company-form-container',
  templateUrl: './company-form.container.html',
<<<<<<< HEAD

  providers:[CompanyService]

  host: { 
    class: 'd-flex h-100 overflow-hidden' 
  },

=======
  providers: [CompanyService],
  host: {
    class: 'd-flex h-100 overflow-hidden'
  },
>>>>>>> ecc4ab9d4d6e1d146c398712af6b61d788ecd295
})
export class CompanyFormContainer implements OnInit {

  // observable of Company
  company$: Observable<Company>;
  //employee id for update
  public companyId: number;

  constructor(private companyService: CompanyService, private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.companyId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.companyId) {
      this.company$ = this.companyService.getCompanyById(this.companyId);
    }
  }

  /**
   * add company data
   * @param company acompany object
   */
  public addCompany(company: Company): void {
    debugger
    this.companyService.addCompanyData(company).subscribe(data => {
      debugger
      if (data) {
        alert('Record Inserted...!!!');
      }
      else {

        alert('Not Inserted...!!!');
      }
    });
  }

  /**
   * update employee
   * @param employee employee detail
   */
  public updateCompany(company: Company) : void {
    if (this.companyId) {
      this.companyService.updateCompanyData(company, this.companyId).subscribe(data => {
        if (data) {
          alert('Record Updated...!!!');
        }
      });
    }
  }
}
