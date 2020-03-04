import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, DoCheck, OnChanges } from '@angular/core';

import { Company } from '../../company.model';
import { CompanyFilterPresentation } from './company-filter-presentation/company-filter.presentation';
import { CompanyListPresenter } from '../company-list-presenter/company-list.presenter';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'cmp-company-list-ui',
  templateUrl: './company-list.presentation.html',
  styleUrls: ['./company-list.presentation.scss'],
  viewProviders: [CompanyListPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompanyListPresentation implements OnChanges {

  // Get Company list
  @Input() set companyList$(value) {
    this.filteredUsers = value;
    this.users = value;
  }
  // Get Filter Data
  @Input() getFilterData;

  @Output() public deleteCompany = new EventEmitter<number>();
  @Output() public sort = new EventEmitter<string>();

  @Output() sendData = new EventEmitter<any>();

  // Temp for store data
  users: any;
  // store filtered data
  filteredUsers: any[] = [];

  public sortBy: string;
  
  constructor(
    private companyListPresenter: CompanyListPresenter,
  ) {

    this.sort = new EventEmitter<string>();
  }

  public ngOnInit(): void {
    
  }

  /**
   * This method will delete the records of a particular record
   * @param id This is the id that need to be deleted 
   */
  public delete(id: number): void {
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
    this.sortBy = document.activeElement.id;
    this.sort.emit(`_sort=${this.sortBy}&_order=desc`)
  }

  public ngOnChanges(): void {
    if (this.getFilterData) {
      this.filteredUsers = this.companyListPresenter.filterUserList(this.getFilterData, this.users, this.filteredUsers);
    }
  }

  /**
   * filter
   */
  public filter(): void {
    this.companyListPresenter.filter(this.users);
    this.companyListPresenter.subject.subscribe(data => {
      this.sendData.emit(data);
    });
  }
}
