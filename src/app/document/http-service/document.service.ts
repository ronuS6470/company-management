import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Document } from 'src/app/document/document.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class DocumentService {
  // api url 
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
  /**
   * Creates new Document
   * @param document Documents details to be created
   */
  public addData(document: Document): Observable<Document> {
    return this.httpClient.post<Document>(`${this.apiUrl}`, document);
  }

  /**
   * Updation of data for an existing Employee in local storage
   * @param employee Updated Details of Document
   * @param id Id of updated Document
   */
  public editData(document: Document, id: number): Observable<Document> {
    return this.httpClient.patch<Document>(`${this.apiUrl}/${id}`, document);
  }
  /**
   * delete single or multiple documents using http delete
   * @param id 
   */
  public deleteDocument(id: number): Observable<Document> {
    return this.httpClient.delete<Document>(`${this.apiUrl}/${id}`);
  }

  /**
   * to get data after sort is implemented
   * @param sortField 
   */
  public sortData(sortField: string): Observable<Document[]> {
    return this.httpClient.get<Document[]>(`${this.apiUrl}?${sortField}`);
  }
}
