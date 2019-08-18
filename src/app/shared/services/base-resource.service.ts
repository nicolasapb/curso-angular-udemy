import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map, flatMap } from 'rxjs/operators';

import { BaseResourceModel } from '../models/base-resource.model';
import { Injector } from '@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  protected http: HttpClient;

  constructor(
    protected apiPath: string,
    protected injector: Injector  ) {
      this.http = injector.get(HttpClient);
    }

  // C R U D

  /**
   * GET all
   */
  getAll(): Observable<T[]> {
    return this.http.get(this.apiPath)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToResources)
      );
  }

  /**
   * GET by ID
   * @param id - Resource ID
   */
  getById(id: number): Observable<T> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToResource)
      );
  }

  /**
   * POST new Resource
   * @param resource - new Resource
   */
  create(resource: T): Observable<T> {
    return this.http.post(this.apiPath, resource, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToResource)
      );
  }

  /**
   * PUT updated Resource
   * @param resource - updated Resource
   */
  update(resource: T): Observable<T> {
    const url = `${this.apiPath}/${resource.id}`;

    return this.http.put(url, resource, this.httpOptions)
    .pipe(
      catchError(this.handleError),
      map(() => resource)
    );
  }

  /**
   * DELETE Resource
   * @param id - Resource ID to be deleted
   */
  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url)
      .pipe(
        catchError(this.handleError),
        map(() => null)
      );
  }

  // PRIVATE METHODS

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];

    jsonData.forEach(element => resources.push(element as T));

    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return jsonData as T;
  }

  protected handleError(error: any): Observable<any> {
    console.log('Erro na requisição: ', error);
    return throwError(error);
  }

}
