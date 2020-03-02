import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Company } from './company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public companyUrl: string;
  constructor(private http: HttpClient) {
    this.companyUrl = environment.baseUrl + 'company';
  }

  /**
   * This method get all the records from JSON
   */
  public getCompanies():Observable<Company[]>
  {
      return this.http.get<Company[]>(this.companyUrl);
  }

  /**
   * add company
   * @param company company object
   */
  public addCompanyData(company: Company): Observable<Company> {
    debugger
    return this.http.post<Company>(`${this.companyUrl}`, company);
  }
}
