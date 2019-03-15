import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { HistoricoEstoqueComponent } from './historico-estoque/historico-estoque.component';

@NgModule({
  declarations: [
   AdminComponent,
   DashboardComponent,
   RelatoriosComponent,
   HistoricoEstoqueComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ],
  providers: []
})
export class AdminModule { }
