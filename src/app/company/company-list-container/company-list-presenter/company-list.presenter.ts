import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';

import { Company } from '../../company.model';
import { CompanyFilterPresentation } from '../company-list-presentation/company-filter-presentation/company-filter.presentation';
import { CompanyToken } from '../../token';
import { Subject } from 'rxjs';
@Injectable()
export class CompanyListPresenter {
  public subjectComplay$ = new Subject();
  public data: object;
  constructor(
    private overlay: Overlay,
    public injector: Injector,
    public viewContainerRef: ViewContainerRef,
  ) { }

  /**
   * CreateInjector
   * @param data Comapany Data
   * @param overlayRef Overlay Reference
   */
  public createInjector(data: Company= null, overlayRef: OverlayRef): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(OverlayRef, overlayRef);
    injectorTokens.set(CompanyToken, data);
    return new PortalInjector(this.injector, injectorTokens);
  }

  // Filter overlay open
  public filter(filter: Company): void {

    // Instance Of OverlayConfig
    let config = new OverlayConfig();

    config.positionStrategy = this.overlay.position()
      .global()
      .centerVertically()
      .right();
    config.hasBackdrop = true;
    let overlayRef = this.overlay.create(config);
    let componentInstance = overlayRef.attach(new ComponentPortal(
      CompanyFilterPresentation, this.viewContainerRef, this.createInjector(filter, overlayRef)));
    overlayRef.backdropClick().subscribe(() => {
      this.data = componentInstance.instance.filterData;
      overlayRef.detach();
    });
    componentInstance.instance.filterData.subscribe(data => {
      this.subjectComplay$.next(data);
    });
  }

  /**
   * Filter Fields wise
   * @param filters filter data
   * @param users Stored data
   * @param filteredUsers filter data
   */
  public filterCompanyList(filters: Company, companyTempData: any, filteredUsers: Company): boolean {
    filteredUsers = companyTempData; // Reset User List
    const keys = Object.keys(filters);
    const filterUser = user => {
      let result = keys.map(key => {
        // tslint:disable-next-line: no-bitwise
        if (!~key.indexOf('age')) {
          if (user[key]) {
            return String(user[key]).toLowerCase().startsWith(String(filters[key]).toLowerCase())
          } else { return false; }
        }
      });
      // To Clean Array from undefined if the age is passed so the map will fill the gap with (undefined)
      result = result.filter(it => it !== undefined); // Filter the Age out from the other filters
      return result.reduce((acc, cur: any) => {
        // tslint:disable-next-line: no-bitwise
        return acc & cur;
      }, 1);
    };
    return companyTempData.filter(filterUser);
  }
}
