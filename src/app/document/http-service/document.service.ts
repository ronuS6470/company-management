import { Injectable } from '@angular/core';

import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http'
import {Document} from 'src/app/document/document.model'
import { Observable } from 'rxjs';

@Injectable()
export class DocumentService {
  public id: number;
  private apiUrl;

  constructor(private httpClient: HttpClient) {
    this.apiUrl=environment.baseUrlDocument
  }

  public getDocuments() : Observable<Document[]>{
    return this.httpClient.get<Document[]>( `${this.apiUrl}`);
  }
  public addData(document:Document):Observable<Document>
  {
    return this.httpClient.post<Document>(`${this.apiUrl}`,document)
  }

  /**
   * Updates data of existing Employee in local storage
   * @param employee 
   * @param id 
   */
  public editData(document:Document,id:number):Observable<Document>
  {
    return this.httpClient.put<Document>(`${this.apiUrl}/${id}`,document)
  }

  public deleteDocument(id: number) : Observable<Document>{
    this.id=id;
    return this.httpClient.delete<Document>(`${this.apiUrl}/${id}`);
  }
  public sortData(sortField:string):Observable<Document[]>
  {
    console.log(sortField)
    return this.httpClient.get<Document[]>(`${this.apiUrl}?${sortField}`)
  }
}
