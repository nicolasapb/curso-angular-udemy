import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { faAngleDoubleLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  public faAngleDoubleLeft = faAngleDoubleLeft;
  public faSave = faSave;
  public currencAction: string;
  public entryForm: FormGroup;
  public pageTitle: string;
  public serverErrorMessages: string[] = null;
  public submittingForm = false;
  public entry: Entry = new Entry();
  public categories: Array<Category>;

  public imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '.',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  public ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
    today: 'Hoje',
    clear: 'Limpar',
    dateFormat: 'dd/mm/yy',
    weekHeader: 'Wk'
  };

  constructor(
    private entryService: EntryService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.setCurrentaction();
    this.buildEntryForm();
    this.loadEntry();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currencAction === 'new') {
      this.createEntry();
    } else {
      this.updateEntry();
    }
  }

  get typeOptions(): Array<any> {
    return Object.entries(Entry.types)
      .map(([value, text]) => {
        return { text, value };
      });
  }

  // PRIVATE METHODS

  private setCurrentaction(): void {
    this.route.snapshot.url[0].path === 'new' ? this.currencAction = 'new' : this.currencAction = 'edit';
  }

  private buildEntryForm(): void {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ['expense', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
  }

  private loadEntry(): void {
    if (this.currencAction === 'edit') {
      this.route.paramMap
        .pipe(
          switchMap(params => this.entryService.getById(+params.get('id')))
        )
        .subscribe({
          next: entry => {
            this.entry = entry;
            this.entryForm.patchValue(this.entry);
          },
          error: _ => alert('Ocorreu um erro no servidor')
        });
    }
  }

  private loadCategory(): void {
    this.categoryService.getAll()
      .subscribe({
        next: categories => this.categories = categories,
        error: _ => alert('Ocorreu um erro no servidor')
      });
  }

  private setPageTitle(): void {
    if (this.currencAction === 'new') {
      this.pageTitle = 'Cadastro de novo Lançamento';
    } else {
      const entryName = this.entry.name || '...';
      this.pageTitle = `Editando o lançamento: ${entryName}`;
    }
  }
  private createEntry(): void {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.create(entry)
      .subscribe({
        next: newEntry => this.actionsForSuccess(newEntry),
        error: error => this.actionsForError(error)
      });
  }

  private updateEntry(): void {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.update(entry)
      .subscribe({
        next: newEntry => this.actionsForSuccess(newEntry),
        error: error => this.actionsForError(error)
      });
  }

  private actionsForSuccess(entry: Entry): void {
    toastr.success('Solicitação processada com sucesso');

    this.router.navigateByUrl('entries', {skipLocationChange: true})
      .then(
        () => this.router.navigate(['entries', entry.id, 'edit'])
      );
  }

  private actionsForError(error: any): void {
    toastr.error('Ocorreu um erro ao processar a sua solicitação');

    this.submittingForm = false;

    if (error.stauts === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente  mais tarde'];
    }
  }

}
