import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, DoCheck } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
// ---------------------------------- //

import { Company } from '../../company.model';
import { CompanyFilterPresentation } from './company-filter-presentation/company-filter.presentation';
import { CompanyListPresenter } from '../company-list-presenter/company-list.presenter';
import { Observable } from 'rxjs';
import { OverlayService } from '../../service/overlay.service';

@Component({
  selector: 'cmp-company-list-ui',
  templateUrl: './company-list.presentation.html',
  styleUrls: ['./company-list.presentation.scss'],
  viewProviders: [CompanyListPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})

  
export class CompanyListPresentation implements DoCheck {

  // Get Company list
  @Input() public companyList$:Observable<Company[]>;
  @Output() public deleteCompany = new EventEmitter<number>();
  @Output() public sort = new EventEmitter<string>();

  public sortBy:string


  /**
   * This method will delete the records of a particular record
   * @param id This is the id that need to be deleted 
   */
 public delete(id:number):void
  { 
    this.deleteCompany.emit(id);    
  } 
  // ComponentPortal Instance
  public portalRef: ComponentPortal<CompanyFilterPresentation>;
  // Catch Data
  private catchData;
  subscribeData = null;
  constructor(
    private companyListPresenter: CompanyListPresenter,
    private overlayService: OverlayService,
  ) { 
    
    this.sort=new EventEmitter<string>();
  }

  ngDoCheck(): void {
    console.log(this.catchData);
  }

  

  public sortAscending():void
  {
      this.sortBy=document.activeElement.id
      this.sort.emit(`_sort=${this.sortBy}&_order=asc`)
  }
  public sortDescending():void
  {
      this.sortBy=document.activeElement.id
      console.log(this.sortBy)
      this.sort.emit(`_sort=${this.sortBy}&_order=desc`)
  }


  // filter
  public filter(): void {
    this.catchData = this.companyListPresenter.filter();
  }

  // Open filter form
  open() {
    const ref = this.overlayService.open(null);
    ref.afterClosed$.subscribe(res => {
      this.subscribeData = res.data;
    });
  }

}
