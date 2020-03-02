import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CompanyFilterPresentation } from '../company-list-presentation/company-filter-presentation/company-filter.presentation';

@Injectable()
export class CompanyListPresenter {

    constructor(
        private overlay: Overlay,
    ) {}
    public filter(): void {
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
