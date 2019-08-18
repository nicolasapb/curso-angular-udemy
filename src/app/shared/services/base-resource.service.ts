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
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
      this.http = injector.get(HttpClient);
    }

  // C R U D

  /**
   * GET all
   */
  getAll(): Observable<T[]> {
    return this.http.get(this.apiPath)
      .pipe(
        map(this.jsonDataToResources.bind(this)),
        catchError(this.handleError)
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
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError),
      );
  }

  /**
   * POST new Resource
   * @param resource - new Resource
   */
  create(resource: T): Observable<T> {
    return this.http.post(this.apiPath, resource, this.httpOptions)
      .pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError),
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
      map(() => resource),
      catchError(this.handleError),
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
        map(() => null),
        catchError(this.handleError),
      );
  }

  // PRIVATE METHODS

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];

    jsonData.forEach(
      element => resources.push(this.jsonDataToResourceFn(element))
    );
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any> {
    console.error('Erro na requisição: ', error);
    return throwError(error);
  }

}
