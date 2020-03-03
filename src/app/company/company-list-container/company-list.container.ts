import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'cmp-company-list-container',
  templateUrl: './company-list.container.html',
  providers:[CompanyService]
})
export class CompanyListContainer {
  public companyList$: Observable<Company[]>

  constructor(private companyService :CompanyService) {
    this.getDetails();
  }

  getDetails():void {
    
      this.companyList$ = this.companyService.getCompanies()
  }

  deleteCompany(id:number):void
  {
      debugger;
      this.companyService.deleteCompanies(id).subscribe(
       ()=>{
         this.getDetails();
       } 
      )
  }
}
