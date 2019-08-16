import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map, flatMap } from 'rxjs/operators';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath = 'api/categories';

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
  getAll(): Observable<Category[]> {
    return this.http.get(this.apiPath)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategories)
      );
  }

  /**
   * GET by ID
   * @param id - Category ID
   */
  getById(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategory)
      );
  }

  /**
   * POST new Category
   * @param category - new Category
   */
  create(category: Category): Observable<Category> {
    return this.http.post(this.apiPath, category, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategory)
      );
  }

  /**
   * PUT updated Category
   * @param category - updated Category
   */
  update(category: Category): Observable<Category> {
    const url = `${this.apiPath}/${category.id}`;

    return this.http.put(url, category, this.httpOptions)
    .pipe(
      catchError(this.handleError),
      map(() => category)
    );
  }

  /**
   * DELETE Category
   * @param id - Category ID to be deleted
   */
  delete(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url)
      .pipe(
        catchError(this.handleError),
        map(() => null)
      );
  }


  // PRIVATE METHODS

  private jsonDataToCategories(jsonData: any[]): Category[] {
    const categories: Category[] = [];

    jsonData.forEach(element => categories.push(element as Category));

    return categories;
  }

  private jsonDataToCategory(jsonData: any): Category {
    return jsonData as Category;
  }

  private handleError(error: any): Observable<any> {
    console.log('Erro na requisição: ', error);
    return throwError(error);
  }

}