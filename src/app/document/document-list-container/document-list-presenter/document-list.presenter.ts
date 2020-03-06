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

  //Details of updated Document
  public updatedDetails: Document;
  //Subject for getting updated details of form
  public addFormDetails: Subject<Document>;
  //Subject for getting added details of form
  public updateFormDetails: Subject<Document>;
  constructor(public viewContainerRef: ViewContainerRef, private overlay: Overlay, private injector: Injector) {
    this.addFormDetails = new Subject<Document>();
    this.updateFormDetails = new Subject<Document>();
  }


  /**
   * Open Overlay
   */
  public open(data: object): MyOverlayRef {
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
  public createInjecter(ref: MyOverlayRef, inj: Injector): PortalInjector {
    const injectorTokens = new WeakMap([[MyOverlayRef, ref]]);
    return new PortalInjector(inj, injectorTokens);
  }

  /**
   * Creates an injector
   * @param documentDetails Stores documentDetails
   * @param overlayRef Overlay Reference
   */
  private createInjector(documentDetails: Document, overlayRef: OverlayRef): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(OverlayRef, overlayRef);
    injectorTokens.set(DOCUMENT_DETAILS, documentDetails);
    return new PortalInjector(this.injector, injectorTokens);
  }

  /**
     * Opens an overlay for document form
     * @param documentDetails //Contains the details of document
  */
  public loadForm(documentDetails: any): void {
    let config = new OverlayConfig();

    config.positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
    config.hasBackdrop = true;

    let overlayRef = this.overlay.create(config);

    let ref = overlayRef.attach(new ComponentPortal(DocumentFormPresentation, this.viewContainerRef, this.createInjector(documentDetails, overlayRef)));

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    })


    ref.instance.updateDocument.subscribe((formData: Document) => {
      if (formData) {
        this.updateFormDetails.next(formData);
      }
    })

    ref.instance.addDocument.subscribe((formData: Document) => {
      if (formData) {
        this.addFormDetails.next(formData);
      }
    })

  }

  public ngOnDestroy(): void {
    this.addFormDetails.unsubscribe();
    this.updateFormDetails.unsubscribe();
  }
}

