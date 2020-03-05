
import { Injectable, Injector, ViewContainerRef, OnDestroy } from '@angular/core';
import { OverlayConfig, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { DocumentFilterPresentation } from '../document-list-presentation/document-filter-presentation/document-filter.presentation';
import { DOCUMENT_DETAILS } from '../../token'
import { DocumentFormPresentation } from '../document-list-presentation/document-form-presentation/document-form.presentation';
import { MyOverlayRef } from '../../overlay/myoverlay-ref';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DocumentListPresenter implements OnDestroy{
  public componentRef;
  //Subject for getting details of form
  public formDetails = new Subject<Document>();
  constructor(public viewContainerRef: ViewContainerRef, private overlay: Overlay, private injector: Injector) {
   }


  /**
   * Open Overlay
   */
  open(data): MyOverlayRef {
    const configs = new OverlayConfig();

    configs.positionStrategy = this.overlay.position()
      .global()
      .right()
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

  /**
   * Creates an injector
   * @param documentDetails //Stores documentDetails
   * @param overlayRef //Overlay Reference
   */
  createInjector(documentDetails: Document, overlayRef: OverlayRef): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(OverlayRef, overlayRef);
    injectorTokens.set(DOCUMENT_DETAILS, documentDetails);
    return new PortalInjector(this.injector, injectorTokens);
  }

  /**
     * Opens an overlay for document form
     * @param documentDetails //Contains the details of document
  */
  loadForm(documentDetails: any): Observable<Document> {
    let config = new OverlayConfig();

    config.positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
    config.hasBackdrop = true;

    let overlayRef = this.overlay.create(config);

    let ref = overlayRef.attach(new ComponentPortal(DocumentFormPresentation, this.viewContainerRef, this.createInjector(documentDetails, overlayRef)));

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    })

    ref.instance.updatedDocument.subscribe((formData) => {
      this.formDetails.next(formData);
    })
    return this.formDetails.asObservable();
  }

  ngOnDestroy()
  {
    this.formDetails.unsubscribe();
  }
}

