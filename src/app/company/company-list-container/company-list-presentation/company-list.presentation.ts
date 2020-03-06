import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, OnChanges, OnInit } from '@angular/core';

import { CompanyFilterPresentation } from './company-filter-presentation/company-filter.presentation';
import { Company } from '../../company.model';
import { CompanyListPresenter } from '../company-list-presenter/company-list.presenter';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'cmp-company-list-ui',
  templateUrl: './company-list.presentation.html',
  styleUrls: ['./company-list.presentation.scss'],
  viewProviders: [CompanyListPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompanyListPresentation implements OnInit, OnChanges {

  // Get Company list
  @Input() set companyList$(value: Company) {
    this.filteredCompany = value;
    this.companyTempData = value;
  }
  // Get Filter Data
  @Input() getFilterData: Company;
  // delete single
  @Output() public deleteCompany: EventEmitter<number>;
  // sorting the column
  @Output() public sort: EventEmitter<string>;
  // Emit Company Data
  @Output() sendData: EventEmitter<any>;
  // delete multiple companies
  @Output() public deleteCompanies: EventEmitter<any>;

  public sortBy: string; // name of the column
  public portalRef: ComponentPortal<CompanyFilterPresentation>; // ComponentPortal Instance
  public multipleDeletes; // This has the object from selected records
  public companiesToDelete: number[]; // It contains Id which need to be deleted
  // store filtered data
  public filteredCompany: any;

  // Temp for store data
  private companyTempData: Company;

  constructor(
    private companyListPresenter: CompanyListPresenter,
  ) {
    this.sendData = new EventEmitter<Company>();
    this.sort = new EventEmitter<string>();
    this.deleteCompanies = new EventEmitter<any>();
    this.deleteCompany = new EventEmitter<number>();
    this.multipleDeletes = [];
    this.companiesToDelete = [];
  }

  public ngOnInit(): void { }

  public ngOnChanges(): void {
    if (this.getFilterData) {
      this.filteredCompany = this.companyListPresenter.filterCompanyList(this.getFilterData, this.companyTempData, this.filteredCompany);
    }
  }

  /**
   * This method will delete the records of a particular record
   * @param id This is the id that need to be deleted 
   */
  public delete(id: number): void {
    if (confirm('Are you sure you want to delete?')) {
      this.deleteCompany.emit(id);
    }
  }

  /**
   * This method will sort data in ascending order
   */
  public sortAscending(): void {
    this.sortBy = document.activeElement.id;
    this.sort.emit(`_sort=${this.sortBy}&_order=asc`);
  }

  /**
   * This method will sort data in descending order
   */
  public sortDescending(): void {
    this.sortBy = document.activeElement.id;
    this.sort.emit(`_sort=${this.sortBy}&_order=desc`);
  }

  /**
   * This method will select or unselect checkbox
   * @param event
   */
  public selectAllCompanies(event: any): any {
    if (event.target.checked) {
      this.filteredCompany.map(user => {
        user.checked = true;
        return user;
      });
    } else {
      this.filteredCompany.map(user => {
        user.checked = false;
        return user;
      });
    }
  }

  /**
   * filter data
   */
  public filter(): void {
    this.companyListPresenter.filter(this.getFilterData);
    this.companyListPresenter.subjectComplay$.subscribe(data => {
      this.sendData.emit(data);
    });
  }

  /**
   * This method is useful for multiple delete
   */
  public multipleDelete(): void {
    this.multipleDeletes = this.filteredCompany.filter(data => data.checked);
    for (let i = 0; i < this.multipleDeletes.length; i++) {
      this.companiesToDelete[i] = this.multipleDeletes[i].id;
    }
    if (confirm('Are you sure you want to delete?')) {
      this.deleteCompanies.emit(this.companiesToDelete);
    }
  }
}
