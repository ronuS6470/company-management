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
  public multipleDeletes;
  public companiestoDelete = []
  
  
  constructor(
    private companyListPresenter: CompanyListPresenter,
  ) {

    this.sort = new EventEmitter<string>();
  }

  ngDoCheck(): void {

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


  // Temp for store data
  users: any;
  // store filtered data
  filteredUsers: any[] = [];


  public ngOnInit(): void {
    this.loadCompany();
  }

  public ngOnChanges(): void {
    if (this.getFilterData) {
      this.filteredUsers = this.companyListPresenter.filterUserList(this.getFilterData, this.users, this.filteredUsers);
    }
  }

  public selectAll(event){
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
   * Load Company List data..
   */
  loadCompany(): void {
    this.users = this.companyList$;
    this.filteredUsers = this.filteredUsers.length > 0 ? this.filteredUsers : this.users;
  }

  /**
   * filter
   */
  public filter(): void {
    this.companyListPresenter.filter();
    this.companyListPresenter.subject.subscribe(data => {
      this.sendData.emit(data);
    });
  }
    multipleDelete(){
    
      this.multipleDeletes = this.filteredUsers.filter(data=>data.checked);
      for(let i=0; i<this.multipleDeletes.length; i++){
      this.companiestoDelete[i]=this.multipleDeletes[i].id
      }
         // console.log(this.companiestoDelete);
        this.deleteCompanies.emit(this.companiestoDelete)
      }
}
