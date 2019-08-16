import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { faAngleDoubleLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  public faAngleDoubleLeft = faAngleDoubleLeft;
  public faSave = faSave;
  public currencAction: string;
  public categoryForm: FormGroup;
  public pageTitle: string;
  public serverErrorMessages: string[] = null;
  public submittingForm = false;
  public category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentaction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  // PRIVATE METHODS

  private setCurrentaction(): void {
    this.route.snapshot.url[0].path === 'new' ? this.currencAction = 'new' : this.currencAction = 'edit';
  }

  private buildCategoryForm(): void {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private loadCategory(): void {
    if (this.currencAction === 'edit') {
      this.route.paramMap
      .pipe(
        switchMap(params => this.categoryService.getById(+params.get('id')))
      )
      .subscribe({
        next: category => {
          this.category = category;
          this.categoryForm.patchValue(this.category);
        },
        error: _ => alert('Ocorreu um erro no servidor')
      });
    }
  }

  private setPageTitle(): void {
    if (this.currencAction === 'new') {
      this.pageTitle = 'Cadastro de nova Categoria';
    } else {
      const categoryName = this.category.name || '...';
      this.pageTitle = `Editando a categoria: ${categoryName}`;
    }
  }

}
