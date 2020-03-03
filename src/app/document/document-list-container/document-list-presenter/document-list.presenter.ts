
import { Injectable, Injector, ViewContainerRef } from '@angular/core';
import { OverlayConfig, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { DocumentFilterPresentation } from '../document-list-presentation/document-filter-presentation/document-filter.presentation';
import { MyOverlayRef } from '../../overlay/myoverlay-ref';
import { DOCUMENT_DETAILS } from '../../token'
import { DocumentFormPresentation } from '../document-list-presentation/document-form-presentation/document-form.presentation';

@Injectable()
export class DocumentListPresenter {
  public componentRef;
  public updatedDetails: Document
  constructor(public viewContainerRef: ViewContainerRef, private overlay: Overlay, private injector: Injector) { }


  /**
   * Open Overlay
   */
  open(data): MyOverlayRef {
    const configs = new OverlayConfig();

    configs.positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();
    configs.hasBackdrop = true;

    const overlayRef = this.overlay.create(configs);

    const myOverlayRef = new MyOverlayRef(overlayRef, data);

    const injector = this.createInjecter(myOverlayRef, this.injector);
    this.componentRef = overlayRef.attach(new ComponentPortal(DocumentFilterPresentation, null, injector));

    return myOverlayRef;
  }

  /**
   * create injector
   * @param ref overlay reference
   * @param inj injector
   */
  createInjecter(ref: MyOverlayRef, inj: Injector) {
    const injectorTokens = new WeakMap([[MyOverlayRef, ref]]);
    return new PortalInjector(inj, injectorTokens);
  }
  createInjector(documentDetails: any, overlayRef: OverlayRef): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(OverlayRef, overlayRef);
    injectorTokens.set(DOCUMENT_DETAILS, documentDetails);
    return new PortalInjector(this.injector, injectorTokens);
  }

  loadForm(documentDetails: any): void {
    let config = new OverlayConfig()

    config.positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically()
    config.hasBackdrop = true

    let overlayRef = this.overlay.create(config);

    let ref = overlayRef.attach(new ComponentPortal(DocumentFormPresentation, this.viewContainerRef, this.createInjector(documentDetails, overlayRef)))

    ref.instance.updatedDocument.subscribe((data: Document) => {
      this.updatedDetails = data
      return this.updatedDetails
    })
  }
}

