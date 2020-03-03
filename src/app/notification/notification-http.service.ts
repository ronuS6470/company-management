import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { Notification } from './notification.model';

@Injectable()
export class NotificationHttpService {

  apiUrl: string;
  constructor(private http: HttpClient, private route: Router)
  {
    this.apiUrl=environment.baseUrl;
  }

  public getNotifications() : Observable<Notification[]>
  {
    return this.http.get<Notification[]>(`${this.apiUrl}/notifications`);
  }
}
