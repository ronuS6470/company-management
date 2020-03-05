import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector, OnDestroy, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';

import { DOCUMENT_DETAILS } from '../../token';
import { DocumentFilterPresentation } from '../document-list-presentation/document-filter-presentation/document-filter.presentation';
import { DocumentFormPresentation } from '../document-list-presentation/document-form-presentation/document-form.presentation';
import { MyOverlayRef } from '../../overlay/myoverlay-ref';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DocumentListPresenter implements OnDestroy {
  public updatedDetails: Document;
  public subject = new Subject<any>();
  constructor(public viewContainerRef: ViewContainerRef, private overlay: Overlay, private injector: Injector) { }


  /**
   * Open Overlay
   */
  open(data: object): MyOverlayRef {
    const configs = new OverlayConfig();

    configs.positionStrategy = this.overlay.position()
      .global()
      .right()
      .centerVertically();
    configs.hasBackdrop = true;

    const overlayRef = this.overlay.create(configs);

    const myOverlayRef = new MyOverlayRef(overlayRef, data);

    const injector = this.createInjecter(myOverlayRef, this.injector);
    overlayRef.attach(new ComponentPortal(DocumentFilterPresentation, null, injector));

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });

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

  /**
     * Opens an overlay for document form
     * @param documentDetails //Contains the details of document
     */
  loadForm(documentDetails: any): Observable<any> {
    let config = new OverlayConfig()

    config.positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically()
    config.hasBackdrop = true

    let overlayRef = this.overlay.create(config);

    let ref = overlayRef.attach(new ComponentPortal(DocumentFormPresentation, this.viewContainerRef, this.createInjector(documentDetails, overlayRef)))

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose()
    })

    ref.instance.updatedDocument.subscribe((data: any) => {
      this.subject.next(data)
    })
    return this.subject.asObservable()
  }

  ngOnDestroy() {
    this.subject.unsubscribe()
  }
}

