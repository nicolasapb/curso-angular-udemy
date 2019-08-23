import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { faChartBar, faHandHoldingUsd, faCoins, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

import currencyFormatter from 'currency-formatter';

import { Category } from '../../categories/shared/category.model';
import { Entry } from '../../entries/shared/entry.model';
import { EntryService } from '../../entries/shared/entry.service';
import { CategoryService } from '../../categories/shared/category.service';

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

  public expenseTotal: any = 0;
  public revenueTotal: any = 0;
  public balance: any = 0;

  public expenseChartData: any;
  public revenueChartData: any;

  public chartOptions = {
    scales: {
      yAxes: [
        { ticks: {
          beginAtZero: true
        } }
      ]
    }
  };

  public categories: Category[] = [];
  public entries: Entry[] = [];

  @ViewChild('month', {static: false}) month: ElementRef = null;
  @ViewChild('year', {static: false}) year: ElementRef = null;

  constructor(private entryService: EntryService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe({
      next: categories => this.categories = categories,
      error: error => console.log(error)
    });
  }

  public generateReports(): void {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if (!month || !year) {
      alert('Você precisa selecionar o mês e o ano para gerar o relatório');
    } else {
      this.entryService.getByMonthAndYear(month, year).subscribe({
        next: entries => this.entries = entries,
        error: error => console.log(error)
      });
    }
  }

}
