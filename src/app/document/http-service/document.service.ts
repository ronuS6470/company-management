import { Injectable } from '@angular/core';

import { Document } from 'src/app/document/document.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DocumentService {
  public id: number;
  private apiUrl;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = `${environment.baseUrl}/documents`;
  }
/**
 * get and display documents from the server
 */
  public getDocuments(): Observable<Document[]> {
    return this.httpClient.get<Document[]>(`${this.apiUrl}`);
  }
  public addData(document: Document): Observable<Document> {
    return this.httpClient.post<Document>(`${this.apiUrl}`, document);
  }

  /**
   * Updation of data for an existing Employee in local storage
   * @param employee 
   * @param id 
   */
  public editData(document: Document, id: number): Observable<Document> {
    return this.httpClient.put<Document>(`${this.apiUrl}/${id}`, document);
  }
  /**
   * delete single or multiple documents using http delete
   * @param id 
   */
  public deleteDocument(id: number): Observable<Document> {
    this.id = id;
    return this.httpClient.delete<Document>(`${this.apiUrl}/${id}`);
  }

  /**
   * to get data after sort is implemented
   * @param sortField 
   */
  public sortData(sortField: string): Observable<Document[]> {
    console.log(sortField)
    return this.httpClient.get<Document[]>(`${this.apiUrl}?${sortField}`);
  }
}
