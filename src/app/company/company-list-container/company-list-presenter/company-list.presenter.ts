import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';

import { CompanyFilterPresentation } from '../company-list-presentation/company-filter-presentation/company-filter.presentation';

@Injectable()
export class CompanyListPresenter {

  public data: string;
  constructor(
    private overlay: Overlay,
  ) { }

  // Filter overlay open
  public filter(): any {
    const config = new OverlayConfig();
    config.positionStrategy = this.overlay.position()
      .global()
      .centerVertically()
      .right();
    config.hasBackdrop = true;
    const overlayRef = this.overlay.create(config);
    const componentInstance = overlayRef.attach(new ComponentPortal(CompanyFilterPresentation));
    overlayRef.backdropClick().subscribe(() => {
      this.data = componentInstance.instance.searchText;
      overlayRef.dispose();
      // console.log(this.data);
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
            console.log(user[key]);
            return String(user[key]).toLowerCase().startsWith(String(filters[key]).toLowerCase())
          } else { return false; }
        }
      });
      // To Clean Array from undefined if the age is passed so the map will fill the gap with (undefined)
      result = result.filter(it => it !== undefined); // Filter the Age out from the other filters
      return result.reduce((acc, cur: any) => {
        return acc & cur
      }, 1);
    };
    return users.filter(filterUser);
  }
}
