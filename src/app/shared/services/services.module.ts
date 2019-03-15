import { NgModule } from '@angular/core';
import { UsuarioService } from './usuario/usuario.service';
import { DashboardService } from './dashboard/dashboard.service';
import { ProdutoService } from './produto/produto.service';
import { CartService } from './cart/cart.service';
import { HistoricoService } from './historico/historico.service';

@NgModule({
    providers: [
        UsuarioService,
        DashboardService,
        ProdutoService,
        CartService,
        HistoricoService
    ]
})
export class ServicesModule { }