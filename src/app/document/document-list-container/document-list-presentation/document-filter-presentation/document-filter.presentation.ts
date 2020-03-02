import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
// ---------------------------------- //
import { DocumentFilterPresenter } from '../document-filter-presenter/document-filter.presenter';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'cmp-document-filter-ui',
  templateUrl: './document-filter.presentation.html',
  styleUrls: ['./document-filter.presentation.scss'],
  viewProviders: [DocumentFilterPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentFilterPresentation implements OnInit {
  public filterForm: FormGroup;
  constructor(
    private filterPresenter: DocumentFilterPresenter,
  ) { }

  ngOnInit() {
    this.filterForm = this.filterPresenter.buildForm();
  }

  search(filters: any): void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    // this.groupFilters.emit(filters);
  }
}
