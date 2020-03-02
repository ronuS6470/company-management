import { Component, ChangeDetectionStrategy } from '@angular/core';
// ---------------------------------- //
import { CompanyListPresenter } from '../company-list-presenter/company-list.presenter';
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
