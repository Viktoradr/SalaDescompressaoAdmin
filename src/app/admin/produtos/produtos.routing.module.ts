import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ProdutosComponent } from "./produtos.component";
import { EditarProdutoComponent } from "./editar-produto/editar-produto.component";
import { AddProdutoComponent } from "./add-produto/add-produto.component";

const routes: Routes = [
    { 
        path: '',
        component: ProdutosComponent,
        children: [
            { path: 'Novo', component: AddProdutoComponent },
            { path: 'Editar/:id', component: EditarProdutoComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProdutosRoutingModule { }
