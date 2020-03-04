import { Component, OnInit } from '@angular/core';

import { CompanyService } from '../company.service';
import { Company } from '../company.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'cmp-company-form-container',
  templateUrl: './company-form.container.html',
  providers: [CompanyService],
  host: {
    class: 'd-flex h-100 overflow-hidden'
  },
})
export class CompanyFormContainer implements OnInit {

  // observable of Company
  company$: Observable<Company>;
  //employee id for update
  public companyId: number;

  constructor(private companyService: CompanyService, private route: ActivatedRoute, private router: Router) { }

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
        this.router.navigate(['company/list']);
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
  public updateCompany(company: Company): void {
    if (this.companyId) {
      this.companyService.updateCompanyData(company, this.companyId).subscribe(data => {
        if (data) {
          alert('Record Updated...!!!');
          this.router.navigate(['company/list']);
        }
      });
    }
  }
}
