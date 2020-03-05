/**
 * @author Dhruvit Makadia
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DocumentFilterPresenter } from '../document-filter-presenter/document-filter.presenter';
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
  public search(filters: object): void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    this.ref.close(filters);
  }

  /**
   * close overlay
   */
  public closeOverlay(): void {
    this.ref.overlay.dispose();
  }
}
