import { Component, OnInit } from '@angular/core';
import { faDollarSign, faBalanceScale, faChartLine, faListAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public faDollarSign = faDollarSign;
  public faBalanceScale = faBalanceScale;
  public faChartLine = faChartLine;
  public faListAlt = faListAlt;
  constructor() { }

  ngOnInit() {
  }

}
