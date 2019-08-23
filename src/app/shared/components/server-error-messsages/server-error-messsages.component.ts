import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-error-messsages',
  templateUrl: './server-error-messsages.component.html',
  styleUrls: ['./server-error-messsages.component.css']
})
export class ServerErrorMesssagesComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('server-error-messages') serverErrorMessages: string[] = null;
  constructor() { }

  ngOnInit() {
  }

}
