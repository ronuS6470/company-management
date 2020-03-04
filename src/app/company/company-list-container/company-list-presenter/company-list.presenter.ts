import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';

import { CompanyFilterPresentation } from '../company-list-presentation/company-filter-presentation/company-filter.presentation';
import { Subject } from 'rxjs';
import { CompanyToken } from '../../token';

@Injectable()
export class CompanyListPresenter {
  subject = new Subject();
  public data: string;
  constructor(
    private overlay: Overlay,
    public injector: Injector,
    public viewContainerRef: ViewContainerRef,
  ) { }

  createInjector(data: any, overlayRef: OverlayRef): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(OverlayRef, overlayRef);
    injectorTokens.set(CompanyToken, data);
    return new PortalInjector(this.injector, injectorTokens);
  }

  // Filter overlay open
  public filter(filter): any {
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
      this.data = componentInstance.instance.searchText;
      overlayRef.detach();
    });
    componentInstance.instance.filterData.subscribe(data => {
      this.subject.next(data);
    });
  }

  /**
   * Filter Fields wise
   * @param filters filter data
   * @param users Stored data
   * @param filteredUsers filter data
   */
  public filterUserList(filters: any, users: any, filteredUsers: any): any {
    filteredUsers = users; // Reset User List
    const keys = Object.keys(filters);
    const filterUser = user => {
      let result = keys.map(key => {
        if (!~key.indexOf('age')) {
          if (user[key]) {
            return String(user[key]).toLowerCase().startsWith(String(filters[key]).toLowerCase())
          } else { return false; }
        }
      });
      // To Clean Array from undefined if the age is passed so the map will fill the gap with (undefined)
      result = result.filter(it => it !== undefined); // Filter the Age out from the other filters
      return result.reduce((acc, cur: any) => {
        return acc & cur;
      }, 1);
    };
    return users.filter(filterUser);
  }
}
