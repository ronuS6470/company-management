import { Injectable } from '@angular/core';
import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import {ConfirmationModalComponent} from 'src/app/core/components/confirmation-modal/confirmation-modal.component'

@Injectable({
  providedIn: 'root'
})
export class ConfirmationModalService {

  constructor(private overlay: Overlay) { }

  showOverlay(id:number) {
    
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true
    });
    overlayRef.attach(new ComponentPortal(ConfirmationModalComponent));
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    })
  }
}
