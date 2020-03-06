import { Component } from '@angular/core';

import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'cmp-company-list-container',
  templateUrl: './company-list.container.html',
  providers: [CompanyService]
})

export class CompanyListContainer {

  public companyList$: Observable<Company[]>;

  // Get Filter Data
  public getFilterData: Company;

  constructor(private companyService: CompanyService) {
    this.getDetails();
  }

  /**
   * This method will fetch all the records
   */
  public getDetails(): void {
    this.companyList$ = this.companyService.getCompanies().pipe(
      shareReplay(1)
    )

  }

  /**
   * This method will delete the records of a particular id
   * @param id This is the number whose record will be deleted
   */
  public deleteCompany(id: number): void {
    this.companyService.deleteCompanies(id).subscribe(
      () => {
        this.getDetails();
      }
    )
  }

  /**
   * Company Filter
   * @param $event Company Filter Data
   */
  getCompany($event) {
    this.getFilterData = $event;
  }

  /**
   * This function will sort the records
   * @param sortField this is the name of the field that needs to be sorted
   */
  public sortData(sortField: string): void {
    this.companyList$ = this.companyService.sortData(sortField).pipe(
      shareReplay(1)
    );
  }

  deleteCompanies(deleteCompanies) {
    for (let i = 0; i < deleteCompanies.length; i++) {
      this.companyService.deleteCompanies(deleteCompanies[i]).subscribe(
        () => {
          this.getDetails();
        }
      )
    }
  }

}
