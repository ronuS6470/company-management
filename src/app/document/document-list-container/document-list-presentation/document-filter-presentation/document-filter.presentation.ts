/**
 * @author Dhruvit Makadia
 */

import { Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter } from '@angular/core';
// ---------------------------------- //
import { DocumentFilterPresenter } from '../document-filter-presenter/document-filter.presenter';
import { FormGroup } from '@angular/forms';
import { MyOverlayRef } from 'src/app/document/overlay/myoverlay-ref';


@Component({
  selector: 'cmp-document-filter-ui',
  templateUrl: './document-filter.presentation.html',
  styleUrls: ['./document-filter.presentation.scss'],
  viewProviders: [DocumentFilterPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentFilterPresentation implements OnInit {
  // filter form group
  public filterForm: FormGroup;

  constructor(
    private filterPresenter: DocumentFilterPresenter,
    private ref: MyOverlayRef
  ) { }

  ngOnInit() {
    this.filterForm = this.filterPresenter.buildForm();
  }

  /**
   * submit filters vales with fields
   * @param filters filter fields
   */
  search(filters: any): void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    this.ref.close(filters);
  }
}
