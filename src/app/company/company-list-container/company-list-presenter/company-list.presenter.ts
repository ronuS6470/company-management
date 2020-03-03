import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CompanyFilterPresentation } from '../company-list-presentation/company-filter-presentation/company-filter.presentation';

@Injectable()
export class CompanyListPresenter {
  public data;
  constructor(
    private overlay: Overlay,
  ) { }

  // Filter overlay open
  public filter(): any {
    const config = new OverlayConfig();
    config.positionStrategy = this.overlay.position()
      .global()
      .centerVertically()
      .centerHorizontally();
    // this.nextPosition += 30;
    config.hasBackdrop = true;
    const overlayRef = this.overlay.create(config);
    const componentInstance = overlayRef.attach(new ComponentPortal(CompanyFilterPresentation));
    overlayRef.backdropClick().subscribe(() => {
      this.data = componentInstance.instance.searchText;
      overlayRef.dispose();
      console.log(this.data);
      // return this.data;
    });
  }
}
