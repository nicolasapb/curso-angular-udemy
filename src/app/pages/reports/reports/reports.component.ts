import { Component, OnInit } from '@angular/core';
import { faChartBar, faHandHoldingUsd, faCoins, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public faChartBar = faChartBar;
  public faHandHoldingUsd = faHandHoldingUsd;
  public faCoins = faCoins;
  public faFileInvoiceDollar = faFileInvoiceDollar;
  constructor() { }

  ngOnInit() {
  }

}
