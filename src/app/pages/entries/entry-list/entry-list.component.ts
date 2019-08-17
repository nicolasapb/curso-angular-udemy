import { Component, OnInit } from '@angular/core';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  public entries: Entry[] = [];
  public faPlusSquare = faPlusSquare;

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.entryService.getAll()
      .subscribe({
          next: entries => this.entries = entries.sort((a, b) => b.id - a.id),
          error: error => this.handleServiceError('erro ao carregar a lista', error)
      });
  }

  deleteEntry(entry: Entry): void {
    const mustDelete: boolean = confirm('Deseja realemente excluir este item?');

    if (mustDelete) {
      this.entryService.delete(entry.id)
        .subscribe({
          next: _ => this.entries = this.entries.filter(element => element !== entry ),
          error: error => this.handleServiceError('erro ao deletar a categoria', error)
        });
    }
  }

  private handleServiceError(operation: string, error: any): void {
    alert(operation);
    console.log(error);
  }

}
