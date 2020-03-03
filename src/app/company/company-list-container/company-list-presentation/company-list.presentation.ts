import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, DoCheck, OnChanges, OnInit } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
// ---------------------------------- //
import { CompanyFilterPresentation } from './company-filter-presentation/company-filter.presentation';
import { CompanyListPresenter } from '../company-list-presenter/company-list.presenter';

@Component({
  selector: 'cmp-company-list-ui',
  templateUrl: './company-list.presentation.html',
  styleUrls: ['./company-list.presentation.scss'],
  viewProviders: [CompanyListPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyListPresentation implements OnInit {

  // Get Company list
  @Input() set companyList$(value) {
    this.filteredUsers = value;
    this.users = value;
  }

  @Output() deleteCompany = new EventEmitter<number>();

  // ComponentPortal Instance
  public portalRef: ComponentPortal<CompanyFilterPresentation>;
  subscribeData = null;

  // Temp for store data
  users: any;
  // store filtered data
  filteredUsers: any[] = [];

  constructor(
    private companyListPresenter: CompanyListPresenter,
  ) {

  }
  public ngOnInit(): void {
    // console.log(this.groupFilters);
    this.loadCompany();
  }

  public ngDoCheck(): void {
    if (this.companyListPresenter.data) {
      this.filteredUsers = this.companyListPresenter.filterUserList(this.companyListPresenter.data, this.users, this.filteredUsers);
    }
  }

  /**
   * Load Company List data..
   */
  loadCompany(): void {
    this.users = this.companyList$;
    console.log(this.users);
    this.filteredUsers = this.filteredUsers.length > 0 ? this.filteredUsers : this.users;
  }

  /**
   * filter
   */
  public filter(): void {
    this.companyListPresenter.filter();
  }
}
