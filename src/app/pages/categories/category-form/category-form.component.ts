import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-forms/base-resource-forms.component';

import { faAngleDoubleLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {

  public faAngleDoubleLeft = faAngleDoubleLeft;
  public faSave = faSave;

  constructor(
    protected categoryService: CategoryService,
    protected injector: Injector
  ) {
    super(injector, new Category(), categoryService, Category.fromJson);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  protected creationPageTitle(): string {
    return 'Cadastro de nova categoria';
  }

  protected editionPageTitle(): string {
    const categoryName = this.resource.name || '...';

    return `Editando a categoria: ${categoryName}`;
  }

}
