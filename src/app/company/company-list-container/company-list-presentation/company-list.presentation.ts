import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, OnChanges, OnInit } from '@angular/core';

import { Company } from '../../company.model';
import { CompanyListPresenter } from '../company-list-presenter/company-list.presenter';

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

  @Output() public deleteCompanies = new EventEmitter<any>();
  @Output() public deleteCompany = new EventEmitter<number>();
  @Output() public sort = new EventEmitter<string>();

  // Emit Company Data
  @Output() sendData: EventEmitter<any>;

  public multipleDeletes: any;
  public companiestoDelete = [];

  // Temp for store data
  public companyTempData: Company;
  // store filtered data
  public filteredCompany: any;

  public sortBy: string;

  constructor(
    private companyListPresenter: CompanyListPresenter,
  ) {
    this.sendData = new EventEmitter<Company>();

    this.sort = new EventEmitter<string>();
  }

  public ngOnInit(): void {

  }

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
    // console.log(id);
    this.deleteCompany.emit(id);
  }

  /**
   * This method will sort data in ascending order
   */
  public sortAscending(): void {
    this.sortBy = document.activeElement.id
    this.sort.emit(`_sort=${this.sortBy}&_order=asc`)
  }

  /**
   * This method will sort data in descending order
   */
  public sortDescending(): void {
    this.sortBy = document.activeElement.id
    this.sort.emit(`_sort=${this.sortBy}&_order=desc`)
  }

  /**
   * filter
   */
  public filter(): void {
    this.companyListPresenter.filter(this.getFilterData);
    this.companyListPresenter.subjectComplay$.subscribe(data => {
      this.sendData.emit(data);
    });
  }

  multipleDelete() {
    this.multipleDeletes = this.filteredCompany.filter(data => data.checked);
    for (let i = 0; i < this.multipleDeletes.length; i++) {
      this.companiestoDelete[i] = this.multipleDeletes[i].id;
    }
    // console.log(this.companiestoDelete);
    this.deleteCompanies.emit(this.companiestoDelete);
  }
}
