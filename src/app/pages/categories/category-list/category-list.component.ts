import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  public categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll()
      .subscribe({
          next: categories => this.categories = categories,
          error: error => this.handleServiceError('erro ao carregar a lista', error)
      });
  }

  deleteCategory(category: Category): void {
    const mustDelete: boolean = confirm('Deseja realemente excluir este item?');

    if (mustDelete) {
      this.categoryService.delete(category.id)
        .subscribe({
          next: _ => this.categories = this.categories.filter(element => element !== category ),
          error: error => this.handleServiceError('erro ao deletar a categoria', error)
        });
    }
  }

  private handleServiceError(operation: string, error: any): void {
    alert(operation);
    console.log(error);
  }

}
