import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { PortalModule } from '@angular/cdk/portal'
import {OverlayModule} from '@angular/cdk/overlay'


@NgModule({
  declarations: [HeaderComponent, SidebarComponent, ConfirmationModalComponent],
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule
  ],
  exports: [HeaderComponent, SidebarComponent],
  entryComponents: [ConfirmationModalComponent]
})
export class CoreModule { }
