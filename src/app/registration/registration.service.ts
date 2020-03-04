// /**
//  * @author TapasVashi
//  */
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment'
// import { Observable } from 'rxjs';
// import { Registration } from './registration.model';

// @Injectable()

// export class RegistrationService {

//   private apiUrl: string;

//   constructor(private httpClient: HttpClient) {
//     this.apiUrl = environment.baseUrl;
//   }

//   /**
//    * 
//    * @param registration of type Model 
//    * Post API call to register
//    */
//   public addUser(registration: Registration): Observable<Registration>
//   {
//     return this.httpClient.post<Registration>(`${this.apiUrl}/login`, registration);
//   }
// }
