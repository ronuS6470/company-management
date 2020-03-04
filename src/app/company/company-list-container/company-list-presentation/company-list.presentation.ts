import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, OnChanges, OnInit } from '@angular/core';
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
export class CompanyListPresentation implements OnInit, OnChanges {

  // Get Company list
  @Input() set companyList$(value) {
    this.filteredUsers = value;
    this.users = value;
  }

  // Get Filter Data
  @Input() getFilterData;

  @Output() sendData = new EventEmitter<any>();

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
    this.loadCompany();
  }

  public ngOnChanges(): void {
    if (this.getFilterData) {
      this.filteredUsers = this.companyListPresenter.filterUserList(this.getFilterData, this.users, this.filteredUsers);
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
    this.companyListPresenter.subject.subscribe(data => {
      this.sendData.emit(data);
    });
  }
}
