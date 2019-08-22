import { Component } from '@angular/core';

import { BaseResourceList } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseResourceList<Category> {

  public faPlusSquare = faPlusSquare;

  constructor(protected categoryService: CategoryService) {
    super(categoryService);
   }

}
