import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationContainer } from './notification-container/notification.container';
import { NotificationPresentation } from './notification-container/notification-presentation/notification.presentation';
import { NotificationHttpService } from './notification-http.service';



@NgModule({
  declarations: [
    NotificationContainer,
    NotificationPresentation
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    HttpClientModule
  ],
  providers:[NotificationHttpService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class NotificationModule { }
