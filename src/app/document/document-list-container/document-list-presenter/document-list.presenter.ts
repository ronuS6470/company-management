import { Injectable } from '@angular/core';
import { OverlayConfig, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DocumentFilterPresentation } from '../document-list-presentation/document-filter-presentation/document-filter.presentation';
import { Subject } from 'rxjs';

@Injectable()
export class DocumentListPresenter {
    afterClosed$ = new Subject();
    constructor(private overlay: Overlay) { }

    createOverlay() {
        const config = new OverlayConfig();

        config.positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();
        config.hasBackdrop = true;

        const overlayRef = this.overlay.create(config);
        const pipePortal = new ComponentPortal(DocumentFilterPresentation);
        overlayRef.attach(pipePortal);

        overlayRef.backdropClick().subscribe(() => {
            overlayRef.dispose();
        });
    }
}
