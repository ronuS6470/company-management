import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
// ---------------------------------- //
import { CompanyListPresenter } from '../company-list-presenter/company-list.presenter';
import { Observable } from 'rxjs';
import { Company } from '../../company.model';


@Component({
  selector: 'cmp-company-list-ui',
  templateUrl: './company-list.presentation.html',
  styleUrls: ['./company-list.presentation.scss'],
  viewProviders: [CompanyListPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyListPresentation  {
  @Input() public companyList$:Observable<Company[]>;
  @Output() deleteCompany = new EventEmitter<number>();

  delete(id:number):void
  { 
    debugger;
    this.deleteCompany.emit(id);    
  }

  constructor() {}
}
