import { Component } from '@angular/core';

import { BaseResourceList } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent extends BaseResourceList<Entry> {

  public faPlusSquare = faPlusSquare;

  constructor(protected entryService: EntryService) {
    super(entryService);
   }

}
