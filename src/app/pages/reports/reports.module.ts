import { NgModule } from '@angular/core';

import {ChartModule} from 'primeng/chart';

import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportsComponent } from './reports/reports.component';


@NgModule({
  declarations: [ReportsComponent],
  imports: [
    SharedModule,
    ReportsRoutingModule,
    ChartModule
  ]
})
export class ReportsModule { }
