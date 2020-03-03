import { Injectable } from '@angular/core';

import { Company } from './company.model'  
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
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
  public getCompanies():Observable<Company[]>
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
   * get company by id
   * @param id company id
   */
  public getCompanyById(id: number): Observable<Company> {
    debugger
    return this.http.get<Company>(`${this.companyUrl}/${id}`);
  }

  /**
   * add company
   * @param company company object
   */
  public addCompanyData(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.companyUrl}`, company);
  }
  
  public sortData(sortField:string):Observable<Company[]>
  {
    return this.http.get<Company[]>(`${this.companyUrl}?${sortField}`).pipe(
      shareReplay(1)
    )}

  /**
   * update company 
   * @param company single company data
   */
  public updateCompanyData(company, id: number): Observable<Company> {
    debugger
    return this.http.put<Company>(`${this.companyUrl}/${id}`, company);
  }

  
}
