import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosRoutingModule } from './produtos.routing.module';
import { ProdutosComponent } from './produtos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { AddProdutoComponent } from './add-produto/add-produto.component';

@NgModule({
  declarations: [
   ProdutosComponent,
   EditarProdutoComponent,
   AddProdutoComponent
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    SharedModule,
  ],
  providers: []
})
export class ProdutosModule { }
