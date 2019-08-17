import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath = 'api/entries';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  // CRUD

  /**
   * GET all
   */
  getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntries)
      );
  }

  /**
   * GET by ID
   * @param id - Entry ID
   */
  getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntry)
      );
  }

  /**
   * POST new Entry
   * @param entry - new Entry
   */
  create(entry: Entry): Observable<Entry> {
    return this.http.post(this.apiPath, entry, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntry)
      );
  }

  /**
   * PUT updated Entry
   * @param entry - updated Entry
   */
  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;

    return this.http.put(url, entry, this.httpOptions)
    .pipe(
      catchError(this.handleError),
      map(() => entry)
    );
  }

  /**
   * DELETE Entry
   * @param id - Entry ID to be deleted
   */
  delete(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url)
      .pipe(
        catchError(this.handleError),
        map(() => null)
      );
  }


  // PRIVATE METHODS

  private jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];

    jsonData.forEach(element => entries.push(element as Entry));

    return entries;
  }

  private jsonDataToEntry(jsonData: any): Entry {
    return jsonData as Entry;
  }

  private handleError(error: any): Observable<any> {
    console.log('Erro na requisição: ', error);
    return throwError(error);
  }
}
