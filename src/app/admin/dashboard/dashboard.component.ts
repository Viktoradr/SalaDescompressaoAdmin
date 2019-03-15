import { Component, OnInit, TemplateRef } from '@angular/core';
import { DashboardService } from 'src/app/shared/services/dashboard/dashboard.service';
import { take } from 'rxjs/operators';
import { ProdutoService } from 'src/app/shared/services/produto/produto.service';
import { Produto } from 'src/app/model/produto.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PNotifyProvider } from 'src/app/shared/providers/pnotify/pnotify.provider';
import { MESSAGES } from 'src/app/app.messages';
import { Cart } from 'src/app/model/cart.model';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Usuario } from 'src/app/model/usuario.model';
import { DataProvider } from 'src/app/shared/providers/api/data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  countProdutos: number;
  countProdutosEstoque: number;
  countCartNoMes: number;
  produtos: Array<Produto>;
  totalValorProduto = 0.00;
  produtoMaisCompradoMes: string;
  maiorProdutoEmEstoque: string;
  maiorQtdEmEstoque: any;
  editarEstoque = false;
  usuario: Usuario;

  produtosAlterados: Array<Produto>;
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private dashboardService: DashboardService,
    private produtosService: ProdutoService,
    private cartService: CartService,
    private notify: PNotifyProvider,
    private data: DataProvider
  ) {
    this.usuario = new Usuario();
    this.countProdutos = 0;
    this.countProdutosEstoque = 0;
    this.countCartNoMes = 0;
    this.produtos = new Array<Produto>();
    this.produtosAlterados = new Array<Produto>();
    this.produtoMaisCompradoMes = "Sem informação";
    this.maiorProdutoEmEstoque = "Sem informação";
  }

  ngOnInit() {
    this.usuario = this.data.getUser();

    this.widgetProdutos();
    this.widgetEstoque();
    this.widgetCart();
    this.popularTabela();
  }

  popularTabela() {
    this.produtosService.getProdutos()
      .pipe(take(1))
      .subscribe((res: Array<Produto>) => {

        if (res) {
          this.varificarMaiorEmEstoque(res);
        }
      }, err => {

      });
  }

  widgetProdutos() {
    this.dashboardService.widgetProdutos()
      .pipe(take(1))
      .subscribe((res: number) => {
        this.countProdutos = res;
      });
  }

  widgetEstoque() {
    this.dashboardService.widgetEstoque()
      .pipe(take(1))
      .subscribe((res: number) => {
        this.countProdutosEstoque = res;
      });
  }

  widgetCart() {
    this.dashboardService.widgetCart()
      .pipe(take(1))
      .subscribe((res: number) => {
        this.countCartNoMes = res;
      });

    this.cartService.produtosMaisVendidosMes()
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res) {
          this.produtoMaisCompradoMes = res.nome;
        }
      });
  }

  openModal(template: TemplateRef<any>) {
    this.usuario.justificativa = '';
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' });
  }

  varificarMaiorEmEstoque(res: any) {
    this.produtos = res;
    console.log(res)
    this.totalValorProduto = 0.00;
    let array = new Array<any>();
    res.forEach(element => {
      this.totalValorProduto += element.estoque * Number.parseFloat(element.valorUnidade.replace(',', '.'));
      array.push(element.estoque);
    });

    this.maiorQtdEmEstoque = Math.max.apply(Math, array);
    this.maiorProdutoEmEstoque = this.produtos.find(x => x.estoque == this.maiorQtdEmEstoque).nome;
  }

  habilitarEdicaoEstoque() {
    this.editarEstoque = !this.editarEstoque;
  }

  alterarProduto(prod: Produto, input: any) {

    if (input.value != '') {
      if (this.produtosAlterados.length > 0) {

        let _produto = this.produtos.filter(x => x._id == prod._id)[0];
        //_produto.estoque = input.value;

        var lista = this.produtosAlterados.filter(x => x._id == _produto._id);

        if (lista.length > 0) {
          let _prod = this.produtosAlterados.filter(x => x._id == _produto._id)[0];
          _prod.estoque = input.value;
        } else {
          this.produtosAlterados.push(_produto);
        }
        console.log(input.value, this.produtos.filter(x => x._id == prod._id), this.produtosAlterados);

      } else {
        this.produtosAlterados.push(prod);
      }
    }

  }

  alterarEstoque() {
    this.habilitarEdicaoEstoque();

    this.usuario.produtos = this.produtosAlterados;

    if (this.usuario.justificativa == undefined || this.usuario.justificativa == '') 
    {
      this.notify.info('Aviso', MESSAGES._aviso_justificativa_em_branco);
    } 
    else if (this.produtosAlterados.length > 0) {
      this.produtosService.alterarEstoque(this.usuario)
        .pipe(take(1))
        .subscribe((res: boolean) => {
          if (res) {
            this.notify.success('Alterado', MESSAGES._success_alt_estoque);

            this.varificarMaiorEmEstoque(this.produtos);

            this.modalRef.hide();
          } else {
            this.modalRef.hide();
            this.notify.error('Erro', MESSAGES._erro);
          }
        }, err => {
          this.modalRef.hide();
          this.notify.error('Erro', MESSAGES._erro);
        });
    } else {
      this.modalRef.hide();
      this.notify.info('Aviso', MESSAGES._aviso_alt_estoque);
    }
  }
}
