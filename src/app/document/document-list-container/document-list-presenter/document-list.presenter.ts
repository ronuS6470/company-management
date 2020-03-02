import { Injectable, ViewContainerRef, Injector } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import {DOCUMENT_DETAILS} from '../../token'
import { DocumentFormPresentation } from '../document-list-presentation/document-form-presentation/document-form.presentation';

@Injectable()
export class DocumentListPresenter {

    constructor(public viewContainerRef:ViewContainerRef,private overlay:Overlay,private _injector:Injector) {}

    createInjector(documentDetails:any,overlayRef:OverlayRef): PortalInjector {
        const injectorTokens = new WeakMap();
        injectorTokens.set(OverlayRef, overlayRef);
        injectorTokens.set(DOCUMENT_DETAILS, documentDetails);
        return new PortalInjector(this._injector, injectorTokens);
      }

    loadForm(documentDetails:any):void
    {
      let config=new OverlayConfig()
  
      config.positionStrategy=this.overlay.position().global().centerHorizontally().centerVertically()
      config.hasBackdrop=true
  
      let overlayRef=this.overlay.create(config);
  
      overlayRef.attach(new ComponentPortal(DocumentFormPresentation,this.viewContainerRef,this.createInjector(documentDetails,overlayRef)))
  
      overlayRef.backdropClick().subscribe(()=>
        {
            overlayRef.dispose()
        })  
    }
}
