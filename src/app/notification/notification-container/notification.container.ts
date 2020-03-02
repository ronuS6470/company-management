/**
 * 
 * @author Aastha Yadav
 */

import { Component } from '@angular/core';
import {Observable} from 'rxjs'
import { NotificationHttpService } from '../notification-http.service';
import { Notification } from '../notification.model';

@Component({
  selector: 'cmp-notification-container',
  templateUrl: './notification.container.html'
})
export class NotificationContainer {
  
  notificationData$ : Observable<Notification[]>;
  constructor(private notify:NotificationHttpService) { }  

  ngOnInit()
  {
    //Fetch Data from db.json.
      this.notificationData$ = this.notify.getNotifications();
 }

}