import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/produto.model';
import { ProdutoService } from 'src/app/shared/services/produto/produto.service';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { ProdutoProvider } from 'src/app/shared/providers/produto/produto.provider';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  modalRef: BsModalRef;
  produtos: Array<Produto>;
  navigated: boolean = false;

  constructor(
    private produtoProvider: ProdutoProvider,
    private produtosService: ProdutoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.produtos = new Array<Produto>();
  }

  ngOnInit() {
    this.popularTabela();
    
    this.produtoProvider._produto
      .subscribe((res: Produto) => {
        let index = this.produtos.findIndex(x => x._id == res._id);
 
        if(index != -1) {
          this.produtos[index] = res;
        }
        else this.produtos.push(res);
      });
  }

  popularTabela() {
    this.produtosService.getProdutos()
      .pipe(take(1))
      .subscribe((res: Array<Produto>) => {
        this.produtos = res;
      }, err => {

      });
  }

  editarProduto(produto: Produto) {
    this.navigated = true;
    this.router.navigate(['Editar', produto._id], { relativeTo: this.activatedRoute });
  }

  novoProduto() {
    this.navigated = true;
    this.router.navigate(['Novo'], { relativeTo: this.activatedRoute });
  }

}
