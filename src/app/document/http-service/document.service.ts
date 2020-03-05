import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Document } from 'src/app/document/document.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class DocumentService {
  public id: number;
  private apiUrl;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = `${environment.baseUrl}/documents`;
  }

  public getDocuments(): Observable<Document[]> {
    return this.httpClient.get<Document[]>(`${this.apiUrl}`);
  }
  public addData(document: Document): Observable<Document> {
    return this.httpClient.post<Document>(`${this.apiUrl}`, document)
  }

  /**
   * Updation of data for an existing Employee in local storage
   * @param employee 
   * @param id 
   */
  public editData(document: Document, id: number): Observable<Document> {
    return this.httpClient.put<Document>(`${this.apiUrl}/${id}`, document)
  }
  /**
   * delete a document by specified using http delete method
   * @param id 
   */
  public deleteDocument(id: number): Observable<Document> {
    this.id = id;
    return this.httpClient.delete<Document>(`${this.apiUrl}/${id}`);
  }

  /**
   * to get data after sort
   * @param sortField 
   */
  public sortData(sortField: string): Observable<Document[]> {
    console.log(sortField)
    return this.httpClient.get<Document[]>(`${this.apiUrl}?${sortField}`)
  }
}
