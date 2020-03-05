import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { RouterModule } from '@angular/router';
import { AuthenticateService } from '../login/authenticate.service';
import { AuthGuard } from './services/guard/auth.guard';



@NgModule({
  declarations: [HeaderComponent, SidebarComponent, ConfirmationModalComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [HeaderComponent, SidebarComponent],
  providers: [AuthGuard]
})
export class CoreModule { }
