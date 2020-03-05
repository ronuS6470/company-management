/**
 * @author TapasVashi
 */
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login.model';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticateService {

  private apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  /**
   * http service to check user exists or not
   */
  public getAuthDetails(): Observable<Login[]> {
    return this.httpClient.get<Login[]>(`${this.apiUrl}/login`);
  }
}

