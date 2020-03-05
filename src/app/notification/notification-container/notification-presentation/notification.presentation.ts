import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
// ---------------------------------- //
import { NotificationPresenter } from '../notification-presenter/notification.presenter';
import { Observable } from 'rxjs';
import { Notification } from '../../notification.model';



@Component({
  selector: 'cmp-notification-ui',
  templateUrl: './notification.presentation.html',
  styleUrls: ['./notification.presentation.scss'],
  viewProviders: [NotificationPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationPresentation  {

  @Input() notification$: Observable<Notification[]>;//Input property for notification observable
  constructor() {}

  
}