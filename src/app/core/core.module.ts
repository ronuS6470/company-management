import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { RouterModule } from '@angular/router';

import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthGuard } from './services/guard/auth.guard';



@NgModule({
  declarations: [HeaderComponent, SidebarComponent, ConfirmationModalComponent],
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule,
    RouterModule
  ],
  exports: [HeaderComponent, SidebarComponent],
  providers: [AuthGuard]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
