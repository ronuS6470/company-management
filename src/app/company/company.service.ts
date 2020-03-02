import { Injectable } from '@angular/core';

import { Company } from './company.model'  
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CompanyService {
  public companyUrl: string;
  constructor(private http: HttpClient) {
    this.companyUrl = environment.baseUrl + 'company';
  }

  /**
   * This method get all the records from JSON
   */
  public getCompanies(): Observable<Company[]>
  {
      return this.http.get<Company[]>(this.companyUrl);
  }
 
  /**
   * This method will delete the data from JSON file 
   * @param id This is the id that will be deleted
   */
  public deleteCompanies(id:number):Observable<Company>
  {

    return this.http.delete<Company>(this.companyUrl+'/'+id);
  }

  /**
   * add company
   * @param company company object
   */
  public addCompanyData(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.companyUrl}`, company);
  }
}
