import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { Registration } from './registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiUrl: string;

  constructor(private httpClient: HttpClient) { 
    this.apiUrl = environment.baseUrl;
  }

  public addUser(registration: Registration): Observable<Registration>
  {
    return this.httpClient.post<Registration>(`${this.apiUrl}`, registration);
  }
}
