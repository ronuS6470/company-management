import { Component, ChangeDetectionStrategy } from '@angular/core';
// ---------------------------------- //
import { CompanyListPresenter } from '../company-list-presenter/company-list.presenter';


@Component({
  selector: 'cmp-company-list-ui',
  templateUrl: './company-list.presentation.html',
  styleUrls: ['./company-list.presentation.scss'],
  viewProviders: [CompanyListPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyListPresentationComponent  {
  constructor() {}
}