/**
 * @author TapasVashi
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Login } from './login.model';

@Injectable()
export class AuthenticateService {

  private apiUrl: string;

  constructor(private routes: Router, private httpClient: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  public getAuthDetails(): Observable<Login[]>
  {
    return this.httpClient.get<Login[]>(`${this.apiUrl}/login`);
  }
}

