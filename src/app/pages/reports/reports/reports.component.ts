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
        next: this.setValues.bind(this),
        error: error => console.log(error)
      });
    }
  }

  private setValues(entries: Entry[]): void {
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance(): void {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach( entry => {
      if (entry.type === 'revenue') {
        revenueTotal += currencyFormatter.unformat(entry.amount, {code: 'BRL'});
      } else if (entry.type === 'expense') {
        expenseTotal += currencyFormatter.unformat(entry.amount, {code: 'BRL'});
      }
    });

    this.expenseTotal = currencyFormatter.format(expenseTotal, {code: 'BRL'});
    this.revenueTotal = currencyFormatter.format(revenueTotal, {code: 'BRL'});
    this.balance      = currencyFormatter.format(revenueTotal - expenseTotal, {code: 'BRL'});
  }

  private setChartData() {
    this.revenueChartData = this.getChartData('revenue', 'Receitas', '#28a745');
    this.expenseChartData = this.getChartData('expense', 'Despesas', '#dc3545');
  }

  private getChartData(entryType: string, title: string, color: string) {
    const chartData = [];

    this.categories.forEach( category => {
      // filtering entries by category and type
      const filteredEntries = this.entries.filter( entry => (entry.categoryId === category.id) && (entry.type === entryType) );

      // if found entries, then sum entries amount and add to chartData
      if (filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce( (total, entry) => total + currencyFormatter.unformat(entry.amount, {code: 'BRL'}), 0);
        chartData.push({
          categoryName: category.name,
          totalAmount
        });
      }
    });

    return {
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.totalAmount)
      }]
    };
  }

}
