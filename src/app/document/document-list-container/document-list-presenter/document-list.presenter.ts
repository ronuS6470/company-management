import { Injectable, Injector } from '@angular/core';
import { OverlayConfig, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { DocumentFilterPresentation } from '../document-list-presentation/document-filter-presentation/document-filter.presentation';
import { MyOverlayRef } from '../../overlay/myoverlay-ref';

@Injectable()
export class DocumentListPresenter {
    constructor(private overlay: Overlay, private injector: Injector) { }

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

        const injector = this.createInjector(myOverlayRef, this.injector);
        overlayRef.attach(new ComponentPortal(DocumentFilterPresentation, null, injector));

        return myOverlayRef;
    }

    /**
     * create injector
     * @param ref overlay reference
     * @param inj injector
     */
    createInjector(ref: MyOverlayRef, inj: Injector) {
        const injectorTokens = new WeakMap([[MyOverlayRef, ref]]);
        return new PortalInjector(inj, injectorTokens);
    }
}
