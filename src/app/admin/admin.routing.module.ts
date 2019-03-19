import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RelatoriosComponent } from "./relatorios/relatorios.component";
import { HistoricoEstoqueComponent } from "./historico-estoque/historico-estoque.component";
import { RelatorioComponent } from "./relatorio/relatorio.component";

const routes: Routes = [
    { 
        path: '',
        component: AdminComponent,
        children: [
            { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
            { path: 'Dashboard', component: DashboardComponent },
            { path: 'Usuarios', loadChildren: '../admin/usuarios/usuarios.module#UsuariosModule' },
            { path: 'Produtos', loadChildren: '../admin/produtos/produtos.module#ProdutosModule' },
            { path: 'Relatorios', component: RelatoriosComponent },
            { path: 'Relatorio', component: RelatorioComponent },
            { path: 'Historico', component: HistoricoEstoqueComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
