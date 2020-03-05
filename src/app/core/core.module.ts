import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { PortalModule } from '@angular/cdk/portal';
import {OverlayModule} from '@angular/cdk/overlay';
import { RouterModule } from '@angular/router';
import { AuthenticateService } from '../login/authenticate.service';
import { AuthenticationGuard } from './auth/authentication.guard';



@NgModule({
  declarations: [HeaderComponent, SidebarComponent, ConfirmationModalComponent],
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule,
    RouterModule
  ],
  exports: [HeaderComponent, SidebarComponent, ConfirmationModalComponent],
  entryComponents: [],
  providers: [AuthenticateService,AuthenticationGuard]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
