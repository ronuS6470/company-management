import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, DoCheck, OnChanges, OnInit } from '@angular/core';

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

  @Output() public deleteCompanies = new EventEmitter<any>();
  // Get Company list
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
  
  public sortBy: string;
  public portalRef: ComponentPortal<CompanyFilterPresentation>; // ComponentPortal Instance
  subscribeData = null;
  public multipleDeletes: any[] ;
  public companiesToDelete: number[];
  public users: any;
  // store filtered data
  filteredUsers: any[] = [];

  constructor( private companyListPresenter: CompanyListPresenter) 
  {
    this.sort = new EventEmitter<string>();
  }

  public ngOnInit(): void {

  }

  /**
   * This method will delete the records of a particular record
   * @param id This is the id that need to be deleted 
   */
  public delete(id: number): void {
    // console.log(id);
    if(confirm("Are you sure you want to delete?"))
    {
      this.deleteCompany.emit(id);
    }
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

  public ngOnChanges(): void {
    if (this.getFilterData) {
      this.filteredUsers = this.companyListPresenter.filterUserList(this.getFilterData, this.users, this.filteredUsers);
    }
  }

  /**
   * This method will select or unselect checkbox
   * @param event 
   */
  public selectAllCompanies(event){
   if(event.target.checked)  
   { this.filteredUsers.map(user=>{
      user.checked=true;
      return user;
    })
  }
  else
  {
    this.filteredUsers.map(user=>{
      user.checked=false;
      return user;
    })
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

  /**
   * This method will delete multiple records from JSON
   */
  public multipleDelete():void{
    this.multipleDeletes = this.filteredUsers.filter(data => data.checked);
    for (let i = 0; i < this.multipleDeletes.length; i++) {
      this.companiesToDelete[i] = this.multipleDeletes[i].id
    }
    // console.log(this.companiestoDelete);
    if(confirm("Are you sure you want to delete?"))
    this.deleteCompanies.emit(this.companiesToDelete)
  }
}
