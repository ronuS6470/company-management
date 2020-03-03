import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
// ---------------------------------- //
import { Company } from '../../company.model';
import { CompanyListPresenter } from '../company-list-presenter/company-list.presenter';
import { Observable } from 'rxjs'
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CompanyFilterPresentation } from './company-filter-presentation/company-filter.presentation';

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

  public selectedId: number[];

  /**
   * This method will delete the records of a particular record
   * @param id This is the id that need to be deleted 
   */
 public delete(id:number):void
  { 
    debugger;
    this.selectedId;
    this.deleteCompany.emit(id);    
  }

  public portelRef: ComponentPortal<CompanyFilterPresentation>;

  constructor(
    private overlay: Overlay,
  ) {}

  public openDialog(): void {
    const config = new OverlayConfig();
    config.positionStrategy = this.overlay.position()
      .global()
      .centerVertically()
      .centerHorizontally();
    // this.nextPosition += 30;
    config.hasBackdrop = true;
    const overlayRef = this.overlay.create(config);
    overlayRef.attach(new ComponentPortal(CompanyFilterPresentation));

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
  }
}
